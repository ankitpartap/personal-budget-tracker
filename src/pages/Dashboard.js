import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import { Modal } from 'antd';


function Dashboard() {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  return (
    <>
      <div>
        <Header />
        <Cards
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}
        />
        <Modal visible={isIncomeModalVisible} onCancel={handleIncomeCancel} title="Add Income" footer={null}>Income</Modal>
        <Modal visible={isExpenseModalVisible} onCancel={handleExpenseCancel} title="Add Expense" footer={null}>Expense</Modal>
      </div>
    </>
  )
}

export default Dashboard