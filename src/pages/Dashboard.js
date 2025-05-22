import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
// import { Modal } from 'antd';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { auth, db, doc } from '../firebase';
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, query, deleteDoc} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
// import moment from "moment";
import TransactionTable from '../components/TransactionTable';
import Chart from '../components/Charts';
import NoTransactions from '../components/NoTransaction';


function Dashboard() {


  // const sampleTransactions = [
  // {
  //   name: "Pay day",
  //   type: "income",
  //   date: "2023-01-15",
  //   amount: 2000,
  //   tag: "salary",
  // },
  // {
  //   name: "Dinner",
  //   type: "expense",
  //   date: "2023-01-20",
  //   amount: 500,
  //   tag: "food",
  // },
  // {
  //   name: "Books",
  //   type: "expense",
  //   date: "2023-01-25",
  //   amount: 300,
  //   tag: "education",
  // },
  // ];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

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

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    // setTransactions([...transactions, newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    // calculateBalance();
  };


  // this function will create a transaction doc
  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if(!many)
        toast.success("Transaction Added!");
        let newArr=transactions;
        newArr.push(transaction);
        setTransactions(newArr);
        calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      if(!many)
        toast.error("Couldn't add transaction");

    }
  }

  async function deleteTransaction(transactionId) {
    if (!transactionId) {
      console.error("Transaction ID is undefined");
      toast.error("Invalid transaction ID");
      return;
    }
    try{
      const transactionRef = doc(db, `users/${user.uid}/transactions/${transactionId}`);
      await deleteDoc(transactionRef);
      setTransactions((prev) => prev.filter((txn) => txn.id !== transactionId));
      console.log("Transaction deleted successfully!");
    toast.success("Transaction Deleted!");

    }catch(e){
      console.error("Error deleting transaction: ", e);
    toast.error("Couldn't delete transaction");
    }
  }
  useEffect(() => {
    //get all docs from a collection
    fetchTransactions();
  }, [user])

  useEffect(() => {
    //calculate balance everytime when transaction is done
    calculateBalance();
  }, [transactions])


  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // doc.data will get the data in object from which we will push it in the array
        transactionsArray.push({id: doc.id, ...doc.data()});
      });
      setTransactions(transactionsArray);
      console.log("array: ", transactionsArray);

      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  let sortedTransactions=transactions.sort((a,b)=>{
    return new Date(a.date) - new Date(b.date)
  })


  return (
    <>
      <div>
        <Header />
        {loading ? <p>Loading...</p>
          : <>
            <Cards
              income={income}
              expense={expense}
              totalBalance={totalBalance}
              showExpenseModal={showExpenseModal}
              showIncomeModal={showIncomeModal}
            />
            {transactions.length!==0?<Chart sortedTransactionsProp={sortedTransactions}/>:<NoTransactions/>}
            <AddExpenseModal isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish} />
            <AddIncomeModal isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish} />
            <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions} deleteTransaction={deleteTransaction}/>

          </>}
      </div>
    </>
  )
}

export default Dashboard