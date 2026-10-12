"use client"
import React, { useEffect, useState } from 'react'
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../store/usersApi'
import { useForm } from 'react-hook-form';

export default function Users() {
  const {data: users} = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [user, setUser] = useState(null);
  const {register, handleSubmit, reset} = useForm();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null)
  useEffect(() => {
    setData(users);
  }, [users])
  console.log(data)
  const onSubmit = (data:any) => {
    if(user !== null){
      updateUser({...data, id : user.id})
    }
    else {
      console.log(data)
      const formDate = new FormData();      
      formDate.append('Images', data.images[0]);
      formDate.append('Name', data.name);
      formDate.append('Description', data.description);
      console.log(formDate)
      addUser(formDate);
    }
  }

  const handleSearch = (e) => {
    if(e.target.value.trim() == ''){
      setData(users)
    }
    setData(users?.data?.filter((elem) => elem.name.toLowerCase().includes(e.target.value.toLowerCase().trim())))
  }

  const handleSelect = (e) => {
    if(e.target.value == 'all'){
      setData(users)
    }
    setData(users?.data?.filter((elem) => elem.isCompleted == e.target.value))
  }
  return (
    <>
      <h1>ToDo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className='border mx-2 px-2 py-1' {...register('name', {required : true})} defaultValue={user?.name} type="text" />
        <input className='border mx-2 px-2 py-1' {...register('description', {required : true})} defaultValue={user?.description} type="text" />
        {user == null ? <input type='file' {...register('images', {required : true})} /> : null}
        <button type='submit'>Save</button>
      </form>
      <div className='m-10'>
        <input type="text" onInput={handleSearch} placeholder='Searh...' className='border' />
        <select onChange={handleSelect}>
          <option value="all">All Status</option>
          <option value={true}>Active</option>
          <option value={false}>InActive</option>
        </select>
      </div>
      <div>
        {data?.data?.length > 0 ? data?.data?.map((elem:any) => (
          <li key={elem.id} className='border p-2 m-10'>
            {elem.images.map((elem) => (
            <img key={elem.id} src={`https://to-dos-api.softclub.tj/images/${elem.imageName}`} alt="" />
            ))}
            <h1>{elem.name}</h1>
            <p>{elem.description}</p>
            <p>{elem.isCompleted ? 'Active' : 'InActive'}</p>
            <button className='border px-2 py-1 mr-1' onClick={() => setUser(elem)}>
              edit
            </button>
            <button className='border px-2 py-1' onClick={() => {
              deleteUser(elem.id)
              }}>Удалить</button>     <button className='border px-2 py-1' onClick={() => {
                setInfo(elem)
                setOpen(!open)
              }}>Info</button>  
          </li>
        )) : data?.map((elem:any) => (
          <li key={elem.id} className='border p-2 m-10'>
            {elem.images.map((elem) => (
            <img key={elem.id} src={`https://to-dos-api.softclub.tj/images/${elem.imageName}`} alt="" />
            ))}
            <h1>{elem.name}</h1>
            <p>{elem.description}</p>
            <p>{elem.isCompleted ? 'Active' : 'InActive'}</p>
            <button className='border px-2 py-1 mr-1' onClick={() => setUser(elem)}>
              edit
            </button>
            <button className='border px-2 py-1' onClick={() => {
              deleteUser(elem.id)
              }}>Удалить</button>
              <button className='border px-2 py-1' onClick={() => {
                setInfo(elem)
                setOpen(!open)
              }}>Info</button>
          </li>
        ))}
      </div>
      <dialog className='fixed' open={open}>
        <li className='border p-2 m-10'>
            {info?.images.map((elem) => (
            <img key={elem.id} src={`https://to-dos-api.softclub.tj/images/${elem.imageName}`} alt="" />
            ))}
            <h1>{info?.name}</h1>
            <p>{info?.description}</p>
            <p>{info?.isCompleted ? 'Active' : 'InActive'}</p>
          </li>
      </dialog>
    </>
  )
}
