import React, { useEffect, useState } from 'react';
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { Radio } from 'antd';
import { Alert } from 'react-bootstrap';
import { toast } from "react-toastify";
import { getRateQuestionAnswers, postUserRate } from '../../../../network';
import "./RatingModal.css";

function RatingModal({ onCancel, isModalVisible, rfqId, orderId, selectedVendor }) {
	const { currentLocal, currentLanguageId } = useSelector((state) => state.currentLocal);
	const [answersList, updateAnswersList] = useState([]);
	const [alertState, updateAlertState] = useState(false);
	const [loadingState, updateLoadingState] = useState(false);
	const [questionsAnswers, updateQuestionsAnswers] = useState([])
	useEffect(() => {
		if (rfqId || orderId) {
			let data = {
				currentLanguageId: currentLanguageId
			}
			getRateQuestionAnswers(data, success => {
				updateQuestionsAnswers(success.data)
			}, fail => {
				console.log(fail)
			})
		}
	}, [currentLanguageId, rfqId, orderId])
	const onAnswersChange = (questionId, answerId) => {
		let answersListVar = [...answersList]
		const questionIndex = answersListVar.findIndex(answer => answer.questionId === questionId)
		if (questionIndex >= 0) {
			answersListVar[questionIndex] = answerId
		} else {
			answersListVar.push(
				answerId
			)
		}
		updateAnswersList(answersListVar)
	}


	const handleSubmitRating = () => {
		if (answersList.length !== questionsAnswers.length) {
			updateAlertState(true)
		} else {
			let data = {
				vendorId: selectedVendor,
				answerIds: answersList
			}
			updateAlertState(false)
			updateLoadingState(true)
			postUserRate(data, success => {
				if (success.success) {
					toast.success(success.message, {
						position: "bottom-right",
						rtl: true,
					});
					onCancel()
				}
			}, fail => {
				toast.error(fail.message, {
					position: "bottom-right",
					rtl: true,
				});
			})
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
						<div>{quest.name} {quest.name.includes('?') ? '' : '?'}</div>
						<div>
							<Radio.Group
								className='d-flex flex-1 justify-content-between my-2'
								options={quest.rateQuestionAnswers}
								onChange={(e) => {
									onAnswersChange(quest.questionId, e.target.value)
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
