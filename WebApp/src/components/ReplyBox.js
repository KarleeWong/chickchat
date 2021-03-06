import React, {PropTypes} from "react"
import {connect} from "react-redux"
import attachImage from "src/util/attachImage"

export class ReplyBox extends React.Component {
  onAttachImage = attachImage.bind
    state = {
        text: ""
    }

    updateText = (e) => {
        this.setState({text: e.target.value})
    }

    sendReply = () => {
        this.props.replyText(this.state.text)
        this.setState({text: ""})
    }

    render () {
        return (
            <div>

                {/* Exercise 2: Render a text input and a button */}
                <input value = {this.state.text} onChange = {this.updateText}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                  this.sendReply()
                }
              }}/>
            <button style={{
              backgroundColor: "#7fffd4",
              border: "2px solid white",
              borderRadius: "8px",
              color: "white",
              padding: "10px 24px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "12px",
            }} onClick={this.sendReply} disabled={this.state.text === ""}>Send Message~</button>
             <input type="file" onChange={this.onAttachImage} />

            </div>
        )
    }
}

sendImage = () => {
  this.props.replyImage(this.state.data)
  this.setState({data: ""})
}
render () {
  return (

    <div>

    <input value= {this.state.text} onChange={this.updateText}
    />
    <button onClick={this.sendReply} disabled={this.state.text === ""}><Send></button>

    <input type="file" onChange={this.onAttachImage} />
    <button onClick= {this.sendImage}> Upload image </button>
    </div>
  )

}

ReplyBox.propTypes = {
    replyImage: PropTypes.func,
    replyText: PropTypes.func
}

export default connect(undefined, {
    replyText: (text) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {text}
    }),
    replyImage: (data) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {data}
    })
})(ReplyBox)
