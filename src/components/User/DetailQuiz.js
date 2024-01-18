import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";
const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({})

    // console.log(location);
    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log(res);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw) //conver array sang 1 kieu cua loadash
                // Group the elements of Array based on `color` property
                .groupBy("id")// gop oj theo nhom quy dinh
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {// key la id ,value la phan tu lap 
                    //tu code
                    let answers = [];
                    let questionDescription, image = [];
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                        // console.log(item.answers);
                    })

                    return { questionId: key, answers, questionDescription, image }// tra ra doi tuong nhu nao 
                }
                )//quy dinh kieu data tra ra
                .value();//gop id mang bang lodash 
            // console.log('>>>check data', data);
            setDataQuiz(data);
        }
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1);
    }
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            // console.log(question)
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answer = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1)
            dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone);
    }
    const handleFinishQuiz = async () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payload = {
            quizId: +quizId,
            answers: []
        };
        // console.log('Finish quiz')
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            // console.log('Finish payload: ', payload)
            let res = await postSubmitQuiz(payload);
            console.log('check ress')
            if (res && res.EC === 0) { // khi thanh cong goi modal len
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
            } else {
                alert('somthing wrongs...');
            }

        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz{quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={
                            dataQuiz &&
                                dataQuiz.length > 0 ?
                                dataQuiz[index] : []
                        } />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary " onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning " onClick={() => handleFinishQuiz()}>Finish</button>
                </div>

            </div>
            <div className="right-content">
                count down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}// truyeenf qua cho modal con
            />
        </div >
    )
}
export default DetailQuiz;