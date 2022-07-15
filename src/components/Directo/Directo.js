import React, {useEffect} from 'react'
import { ZoomMtg } from '@zoomus/websdk'

ZoomMtg.preLoadWasm()
ZoomMtg.prepareJssdk()

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av')

const Directo = () => {

  var signatureEndpoint = 'https://stormy-bastion-21880.herokuapp.com/'
  var sdkKey = 'ejMUC7sZJxrReEZ4iLrllWD4iYqM9W6tOqpS'
  var meetingNumber = '4269760334'
  var role = 0
  var leaveUrl = 'http://localhost:3000'
  var userName = 'React'
  var userEmail = ''
  var passWord = 'Ehkuc2'
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  var registrantToken = ''

  function getSignature() {

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getSignature();
  },[])

  return (
    <div> </div>
  )
}

export default Directo
