import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  createUsers,
  getAllUsers,
  patchUsers,
  deleteUsers,
} from '../../reducer/user';
import MaterialTable from 'material-table';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

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

  const tableData = [];

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    tableData.push({
      key: `user-${user.name}`.toString(),
      name: user.name,
      email: user.email,
      introduce: user.introduce,
    });
  }

  // const columns = [
  //   { title: 'name', field: 'name' },
  //   { title: 'email', field: 'email' },
  //   { title: 'introduce', field: 'introduce' },
  // ];

  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      email: '',
      introduce: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const save = () => {
    dispatch(patchUsers());
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', editable: true },
    { title: 'Email', dataIndex: 'email', key: 'email', editable: true },
    {
      title: 'Introduce',
      dataIndex: 'introduce',
      key: 'introduce',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        console.log(editable);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Admin</h1>

      <Form form={form} component={false}>
        <Styled>
          <Table
            bordered
            columns={columns}
            dataSource={[...tableData]}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Styled>
      </Form>
      {/* <MaterialTable
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
      /> */}
    </div>
  );
};

const Styled = styled.div`
  .editable-row .ant-form-item-explain {
    position: absolute;
    top: 100%;
    font-size: 12px;
  }
`;

export default Admin;
