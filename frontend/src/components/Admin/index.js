import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createUsers,
  getAllUsers,
  patchUsers,
  deleteUsers,
} from '../../reducer/user';
import MaterialTable from 'material-table';

const Admin = () => {
  //store에서 값을 가져오게.
  const dispatch = useDispatch();
  const { users } = useSelector((state) => {
    // useSelector => redux 스토어의 상태를 조회한다.
    return state.user; //root reducer에서 명시한 이름
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const columns = [
    { title: 'name', field: 'name' },
    { title: 'email', field: 'email' },
    { title: 'introduce', field: 'introduce' },
  ];

  return (
    <div>
      <h1>Admin</h1>
      <MaterialTable
        title="유저 리스트"
        columns={columns}
        data={[...users]}
        editable={{
          onRowAdd: (newData) => {
            new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(createUsers(newData));
                resolve();
              }, 1000);
            });
          },
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                dispatch(patchUsers(newData));
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              dispatch(deleteUsers(oldData));
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

export default Admin;
