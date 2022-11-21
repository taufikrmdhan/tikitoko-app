import React from 'react'
import styles from "../auth.module.css"
import logo from "../../../assets/logo.svg"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const [role, setRole] = useState("Buyer");
  const navigate = useNavigate();
    const [form, setForm] = useState({
         name:'',
         password:'',
         email:'',
    })
    const [form2, setForm2] = useState({
         name:'',
         password:'',
         email:'',
         phone:'',
    })
    
    const onSubmit1 =  (e) => {
        e.preventDefault();
        // console.log(form)
        if(form.name == "" || form.phone == "" || form.password == ""){
            alert('Semua input wajib diisi')}
        // }else {
        //     if (form.password !== form.password2) {
        //       alert("Password harus sama");
        //       return navigate ("/register")
        //     }
            const body = {
                name: form.name,
                password: form.password,
                email: form.email,
            }
            axios.post(`http://localhost:4000/v1/buyer/register`, body)
            .then((response) => {
                if(response.data.code !== 200){
                    alert(response.data.message)
                }
                else{
                    console.log(response.data)
                    return navigate('/login')
                }
            }).catch((err) => {
                console.error(err)
            })
    }

    const onSubmit2 =  (e) => {
        e.preventDefault();
        // console.log(form)
        if(form2.name == "" || form2.email == "" || form2.password == "" || form2.phone == ""){
            alert('Semua input wajib diisi')}
        // }else {
        //     if (form2.password !== form2.password2) {
        //       alert("Password harus sama");
        //       return navigate ("/register")
        //     }
            const body = {
                name: form2.name,
                password: form2.password,
                email: form2.email,
                phone: form2.phone,
            }
            axios.post(`http://localhost:4000/v1/seller/register`, body)
            .then((response) => {
                if(response.data.code !== 200){
                    alert(response.data.message)
                }
                else{
                    console.log(response.data)
                    return navigate('/login')
                }
            }).catch((err) => {
                console.error(err)
            })
    }
  return (
    <>
   <section className={`${styles['auth-section']}`}>
        <div className="justify-content-center flex d-flex">
          <div className="flex d-flex justify-items-between">
            <img src={logo} alt="" />
            <h1 className={`${styles['logo-tikitoko']}`}>Tikitoko</h1>
          </div>
        </div>
        <p className='flex d-flex justify-content-center fw-bold mt-2'>Please sign up with your account</p>
        <div className="mt-5 justify-content-center align-items-center flex d-flex">
        {
            role === "Buyer" ?
          <>
          <button onClick={() => setRole("Buyer")} className={`${styles.active} ${styles['btn-customer']}`}>Customer</button>
          <button onClick={() => setRole("Seller")} className={`${styles['btn-seller']}`}>Seller</button>
          </>           
          :
          role === "Seller" ?
          <>
          <button onClick={() => setRole("Buyer")} className={`${styles['btn-customer']}`}>Customer</button>
          <button onClick={() => setRole("Seller")} className={`${styles.active} ${styles['btn-seller']}`}>Seller</button>
          </>
          :
          ""
          }
        </div>
        {
          role === "Buyer" ?
          <form onSubmit={(e) => onSubmit1(e)}>
          <div className="mt-5">
          <div className={`mb-3 ${styles['form-group']}`}>
            <input type="text" id='storename' onChange={(e) => setForm({...form, name: e.target.value})} placeholder='Name'/>
          </div>
          <div className={`mb-3 ${styles['form-group']}`}>
            <input type="email" id='email' onChange={(e) => setForm({...form, email: e.target.value})} placeholder='Email'/>
          </div>
          <div className={`${styles['form-group']}`}>
            <input type="password" id='password' onChange={(e) => setForm({...form, password: e.target.value})} placeholder='Password'/>
          </div>
          <div className="mt-5 justify-content-center align-items-center flex d-flex">
            <button className={`${styles['form-login']}`}>REGISTER</button>
          </div>
          <div className="mt-3 justify-content-center align-items-center flex d-flex">
          <p>Already have a Tokopedia account? <button className={`${styles['button-register-now']}`}>Login</button></p>
          </div>
          </div>
        </form>
        :
        role === "Seller" ?
        <form onSubmit={(e) => onSubmit2(e)}>
          <div className="mt-5">
          <div className={`mb-3 ${styles['form-group']}`}>
            <input type="text" id='storename' onChange={(e) => setForm2({...form2, name: e.target.value})} placeholder='Store Name'/>
          </div>
          <div className={`mb-3 ${styles['form-group']}`}>
            <input type="email" id='email' onChange={(e) => setForm2({...form2, email: e.target.value})} placeholder='Email'/>
          </div>
          <div className={`mb-3 ${styles['form-group']}`}>
            <input type="phone" id='phone' onChange={(e) => setForm2({...form2, phone: e.target.value})} placeholder='Phone Number'/>
          </div>
          <div className={`${styles['form-group']}`}>
            <input type="password" id='password' onChange={(e) => setForm2({...form2, password: e.target.value})} placeholder='Password'/>
          </div>
          <div className="mt-5 justify-content-center align-items-center flex d-flex">
            <button className={`${styles['form-login']}`}>REGISTER</button>
          </div>
          <div className="mt-3 justify-content-center align-items-center flex d-flex">
          <p>Already have a Tokopedia account? <button className={`${styles['button-register-now']}`}>Login</button></p>
          </div>
          </div>
        </form>
        :
        ""
        }
        
    </section>
  </>
  )
}

export default Register