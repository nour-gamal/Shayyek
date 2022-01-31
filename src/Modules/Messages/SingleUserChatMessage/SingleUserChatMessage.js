// component
import { Button, Input } from "antd";
import Microphone from "../../../Resources/Assets/microphone.png";
import PaperClip from "../../../Resources/Assets/paperclip.png";
import UploadPhoto from "../../../Resources/Assets/uploadPhoto.png";
import SendMessage from "../../../Resources/Assets/sendMessage.png";
import MessageAvatar from "../../../Resources/Assets/MessageAvatar2x.png";
// style
import "./SingleUserChatMessage.css";

const SingleUserChatMessage = () => {
  return (
    <div className="singleUserChatMessage h-100">
      <div className="ppe pps singleUserChatMessage_container">
        <div className="singleUserChatMessage_chat d-flex flex-column justify-content-between">
          <div className="singleUserChatMessage_body flex-1">
            <ul className="chat__messages">
              <li className="message-item reciver">
                <div className="d-inline-flex flex-column  message-item__container">
                  <div className="d-flex align-items-center justify-content-start wrapper">
                    <img class="user" src={MessageAvatar} alt="user-avatar" />
                    <p className="text">
                      <span className="vertically_center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam asperiores neque corporis culpa expedita.
                        Veritatis quos ullam nemo nam autem est. Quia facilis
                        vitae dicta quibusdam cupiditate quasi voluptatem sequi?
                        1st call
                      </span>
                    </p>
                  </div>
                  <div className="time mt-1 w-100">09:48PM</div>
                </div>
              </li>
              <li className="message-item sender">
                <div className="d-inline-flex flex-column  message-item__container">
                  <div className="d-flex align-items-center justify-content-start wrapper">
                    <img class="user" src={MessageAvatar} alt="user-avatar" />
                    <p className="text">
                      <span className="vertically_center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Ad non ullam corporis recusandae sequi facere
                        officiis id eligendi? Aut, ad? 2nd call
                      </span>
                    </p>
                  </div>
                  <div className="time mt-1 w-100">09:48PM</div>
                </div>
              </li>
            </ul>
            <div className="chat__message me"></div>
          </div>
          <div className="singleUserChatMessage_send">
            <div className="chat__uploader">
              <Button type="text">
                <img src={PaperClip} alt="upload-paper" />
              </Button>
              <Button type="text">
                <img src={UploadPhoto} alt="upload-images" />
              </Button>
              <Button type="text">
                <img src={Microphone} alt="record-voice" />
              </Button>
            </div>
            <Input.TextArea
              // onChange={this.onChange}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
            <div className="chat__controler">
              <img className="chat__icon" src={SendMessage} alt="send-data" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserChatMessage;
