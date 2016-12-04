import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"

export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle} ref="messages">
                    {this.props.messages.map(renderMessage)}
                </ul>

                {/* Exercise 2: Add a ReplyBox component */}
                <ReplyBox/>

            </div>
        )
    }

    componentDidUpdate (prevProps) {
        if (prevProps.messages.length === this.props.messages.length) {
            return
        }

        const element = this.refs.messages
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }
}

function renderMessage (message) {
    return (
        <li style={{
          display: "flex",
          fontSize: "18px",
          fontFamily: "Monospace",
          alignItems: "center",
          padding: "5px",
          wordBreak: "break-all"
        }} key={message.messageId}>

            {/* Exercise 3: Add message author */}
          <img style= {{
          borderRadius: "50%",
          border: "5px solid #f0ffff",
          padding: "5px",
          display: "inline-block"

          }} src = {message.author.picture} height ="64px"/>
            {message.author.name + ": "}


            {getMessageBody(message)}
        </li>
    )
}

const ulStyle = {
    overflowY: "scroll",
    listStyle: "none"
    /* Exercise 4: Add your own styles */


}

const imageStyle = {
    maxWidth: "100px",
    maxHeight: "100px",
    objectFit: "contain"
}

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%"
}

function getMessageDate (message) {
    return moment(message.timestampUtc).format("dddd, h:mm A")
}

function getMessageBody (message) {
    if (message.data) {
        return <img src={message.data} style={imageStyle} />
    } else {
        return <span> {message.text} </span>

    }
}

Chat.propTypes = {
    messages: PropTypes.array
}

function mapStateToProps (state) {
    return { messages: state.messages
    }
}

export default connect(
    mapStateToProps
)(Chat)
