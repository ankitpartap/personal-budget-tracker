import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
// import { Modal } from 'antd';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';


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
    console.log("income cancle");
    setIsIncomeModalVisible(false);
  }

  const onFinish=(values, type)=>{
    console.log("Finish: ", values, type);
    
  }
  return (
    <>
      <div>
        <Header />
        <Cards
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}
        />
        {/* <Modal visible={isIncomeModalVisible} onCancel={handleIncomeCancel} title="Add Income" footer={null}>Income</Modal> */}
        <AddExpenseModal isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>
        <AddIncomeModal isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/>
        {/* <Modal visible={isExpenseModalVisible} onCancel={handleExpenseCancel} title="Add Expense" footer={null}>Expense</Modal> */}
      </div>
    </>
  )
}

export default Dashboard