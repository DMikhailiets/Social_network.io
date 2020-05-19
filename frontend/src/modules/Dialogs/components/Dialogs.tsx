import React from 'react'
import style from './dialogs.module.scss'
import Icon, { FormOutlined, TeamOutlined } from '@ant-design/icons';
import { DialogItem } from '../../../components';
import { Layout, PageHeader, Button, Input, Empty } from 'antd';

const { Search } = Input;

type DialogsProps = {
  items: any,
  userId?: any,
  onSearch: any,
  inputValue: any,
  setPartner: Function,
  user: any
}

const Dialogs: React.FC<DialogsProps> = ({ setPartner, items, user,  onSearch, inputValue }) => {
   let dialogsArray = items.map( (dialog: any) => <DialogItem  createdAt={dialog.createdAt} partner={dialog.partner}_id={dialog._id} lastMessage={dialog.lastMessage} user={user} setPartner={setPartner} key={dialog._id} dialog={dialog}/>)
    return (
        <div>
          <Layout className={style.dialogs_wrapper}>
          <div className="chat__sidebar">
            <div className={style.chat__sidebar_header}>
              <div>
                <TeamOutlined />
                <span style={{marginLeft: "5px"}}>Dialogs list</span>
              </div>
              <FormOutlined />
            </div>
          <div>
         <Search
            className={style.search}
            placeholder="input search user"
            onChange={e => onSearch(e.target.value)}
            value={inputValue}    
         />
         </div>
        </div >
        {
          (items.length !== 0)
          ? <div className={style.dialogs_items} style={{marginTop: "15px"}}>
              {dialogsArray}
            </div>
          : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
            <Empty description=''image={Empty.PRESENTED_IMAGE_SIMPLE}/>
          </div>
        }
          </Layout>
        </div>
    )
}

export default Dialogs

