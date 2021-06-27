import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/question';
import { RoomCode } from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { database } from '../services/firebase';
import { Fragment } from 'react';

type RoomParams = {
    id: string
}

export function AdminRoom() {
    //const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);
    const history = useHistory();

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        });

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ isAnswered: true });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ isHighlighted: true });
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    <span>{questions.length} pergunta(s)</span>
                </div>

                <div className="question-list">
                    {
                        questions.length > 0 ?

                            (
                                questions.map(question => {
                                    return (
                                        <Question
                                            key={question.id}
                                            content={question.content}
                                            author={question.author}
                                            isHighlighted={question.isHighlighted}
                                            isAnswered={question.isAnswered}
                                        >
                                            {
                                                !question.isAnswered && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                                        >
                                                            <img src={checkImg} title="Marcar pergunta como respondida" alt="Marcar pergunta como respondida" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleHighlightQuestion(question.id)}
                                                        >
                                                            <img src={answerImg} title="Destacar a pergunta" alt="Destacar a pergunta" />
                                                        </button>
                                                    </>
                                                )
                                            }
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteQuestion(question.id)}
                                            >
                                                <img src={deleteImg} title="Remover pergunta" alt="Remover pergunta" />
                                            </button>
                                        </Question>
                                    );
                                })

                            ) :
                            <div>
                                <span>Aguardando a primeira pergunta...</span>
                                <br />
                                <span>Copie o código da sala e compartilhe com as pessoas.</span>
                            </div>


                    }
                </div>
            </main>
        </div>
    );
}