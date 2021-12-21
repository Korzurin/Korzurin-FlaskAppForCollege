// class Chatbox {
//     constructor(){
//         this.args = {
//             openButton: document.querySelector('.chatbox__button'),
//             chatBox: document.querySelector('.chatbox__support'),
//             sendButton: document.querySelector('.send__button')
//         }
//         this.state = false;
//         this.message = [];
//     }

//     display(){
//         const {openButton, chatBox, sendButton} = this.args;

//         openButton.addEventListener('click', () => this.toggleState(chatBox))
//         sendButton.addEventListener('click', () => this.onSendButton(chatBox))

//         const node = chatBox.querySelector('input');
//         node.addEventListener("keyup", ({key}) => {
//             if (key == "Enter") {
//                 this.onSendButton(chatBox)
//             }
//         })
//     }

//     toggleState(chatbox) {
//         this.state = !this.state;

//         if(this.state) {
//             chatbox.classlist.add('chatbox--active')
//         }
//         else {
//             chatbox.classlist.remove('chatbox--active')
//         }
//     }

//     onSendButton(chatbox){
//         yar textField = chatbox.querySelector('input');
//         let text1 = textField.value
//         if(text1 === ""){
//             return;
//         }
//         let msg1 = { name: "User", message: text1 }
//         this.message.push(msg1);

//         // http://127.0.0.1:5000/predict

//     }





// }













class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: JSON.stringify({ message: text1 }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(r => r.json())
            .then(r => {
                if (r.answer !== 'Статья не найдена') {
                    let msg3 = { name: "hi", message: 'Вот ваши ссылка(и)' };
                    this.messages.push(msg3);
                    this.updateChatText(chatbox);
                } else {
                    let msg3 = { name: "hi", message: 'Результаты не обнаружены' };
                    this.messages.push(msg3);
                    this.updateChatText(chatbox);
                }
                r.answer.forEach(element => {
                    let msg2 = { name: "rtk", message: element };
                    this.messages.push(msg2);
                    this.updateChatText(chatbox)
                });
                textField.value = ''

            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                textField.value = ''
            });
    }

    // без оптимизации
    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "hi") {
                html += `<div class="messages__item messages__item--visitor">${item.message}</div>`
            } else if (item.name === "rtk") {
                html += `<div class="messages__item messages__item--visitor"><a href="${item.message}" target="_blank">https://spb-rtk.ru/..</a></div>`
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();

// Arr={}
// Arr['color'] = 'red';
// Arr['size'] = 'big';
// for( var ArrVal in Arr ) {
//     console.log( ArrVal );
// }


// без оптимизации
// updateChatText(chatbox) {
//     var html = '';
//     this.messages.slice().reverse().forEach(function(item, index) {
//         if (item.name === "rtk") {
//             html += `<div class="messages__item messages__item--visitor"><a href="${item.message}" target="_blank">${item.message}</a></div>`
//         } else {
//             html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
//         }
//     });

//     const chatmessage = chatbox.querySelector('.chatbox__messages');
//     chatmessage.innerHTML = html;
// }