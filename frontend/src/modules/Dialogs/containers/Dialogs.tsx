import React, { useEffect, useState} from 'react'
import { default as BaseDialogs}   from '../components/Dialogs'
import socket from '../../../core/socket'
import { Row, Col } from 'antd'
import MessagesModule from '../../../modules/MessagesModule'
import { PlusCircleOutlined } from '@ant-design/icons'
import { sortBy } from 'lodash'
import _ from 'lodash'

type DialogsProps = {
  getDialogs: Function,
  dialogs_items: any,
  user: {
    fullname: string,
    _id: string
  },
  getMessages: Function,
  messages: any,
  sendMessage: Function
}

const Dialogs: React.FC<DialogsProps> = ({ user, getMessages, sendMessage, messages, dialogs_items, getDialogs, ...props}) => {
  const[partner, setPartner] = useState([])
  const onNewDialog = () => {
    getDialogs()
  }
  const [inputValue, setValue] = useState("")
  const [filtred, setFiltredItems] = useState(Array.from(dialogs_items))
  const onChangeInput = (value:any) => {
    setFiltredItems(
      dialogs_items.filter( 
        (dialog:any) => 
          dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 || dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 
      )
    )
    setValue(value)
  }
  useEffect(() => {
    socket.on("SERVER:DIALOG_CREATED", onNewDialog)
    if(!dialogs_items.length){
      getDialogs()
    } else {
      setFiltredItems(dialogs_items)
    }
    return () => {socket.removeListener("SERVER:DIALOG_CREATED", onNewDialog)}
  },[dialogs_items])
  //<MessagesModule />
  return ( 
    <Row>
      <Col span={8}>
        
        <BaseDialogs
          user={user}
          setPartner={setPartner} 
          items={_.sortBy(filtred, 'updatedAt').reverse()}
          onSearch={onChangeInput}
          inputValue={inputValue}
        />  
      </Col>
      <Col style={{backgroundColor: 'white'}}span={16}>
        <MessagesModule sendMessage={sendMessage} getDialogs={getDialogs} partner={partner} messages={messages} user={user} getMessages={getMessages}/>
      </Col>
    </Row>             
  )
  }
  
  export default Dialogs;