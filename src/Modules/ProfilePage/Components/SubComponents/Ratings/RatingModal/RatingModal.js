import React, { useState } from 'react';
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { Radio } from 'antd';
import { Alert } from 'react-bootstrap';
import "./RatingModal.css";

function RatingModal({ onCancel, isModalVisible }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [answersList, updateAnswersList] = useState([]);
	const [alertState, updateAlertState] = useState(false);
	const [loadingState, updateLoadingState] = useState(false)
	const questionsAnswers = [{
		question: 'hello',
		id: 1,
		answers: [{
			value: 1,
			label: 'good'
		}, {
			value: 2,
			label: 'fine'
		}, {
			value: 3,
			label: 'not bad'
		}, {
			value: 4,
			label: 'ugly'
		}]
	}, {
		question: 'hello',
		id: 2,
		answers: [{
			value: 3,
			label: 'good'
		}, {
			value: 4,
			label: 'fine'
		}, {
			value: 5,
			label: 'not bad'
		}, {
			value: 6,
			label: 'ugly'
		}]
	}]
	const onAnswersChange = (questionId, answerId) => {
		let answersListVar = [...answersList]
		const questionIndex = answersListVar.findIndex(answer => answer.questionId === questionId)
		if (questionIndex >= 0) {
			answersListVar[questionIndex] = { questionId, answerId }
		} else {
			answersListVar.push({
				questionId,
				answerId
			})
		}
		updateAnswersList(answersListVar)
	}


	const handleSubmitRating = () => {
		if (answersList.length !== questionsAnswers.length) {
			updateAlertState(true)
		} else {
			updateAlertState(false)
			updateLoadingState(true)
		}
	}
	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg ratingModal"
		>
			<h4>{currentLocal.profilePage.didYouWorkWith} {currentLocal.profilePage.rateIt}</h4>
			{alertState && <Alert variant={'danger'}
				className='text-center'>{currentLocal.profilePage.rateValidation}
			</Alert>}
			<>{
				questionsAnswers.map((quest, index) => {
					return <div className={`my-4 p-4 questionBox`}
						key={index}
					>
						<div>{quest.question} ?</div>
						<div>
							<Radio.Group
								className='d-flex flex-1 justify-content-between my-2'
								options={quest.answers}
								onChange={(e) => {
									onAnswersChange(quest.id, e.target.value)
								}}
							/>
						</div>
					</div>
				})
			}
			</>
			<div className="text-center">
				<Button className='button-primary' onClick={handleSubmitRating} loading={loadingState}>
					{currentLocal.buyerHome.confirm}
				</Button>
			</div>
		</Modal>
	);
}

export default RatingModal;
