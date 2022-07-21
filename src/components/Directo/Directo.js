import React, {useEffect} from 'react'
import { ZoomMtg } from '@zoomus/websdk'

import { getLocalUserdata } from "../../services/auth/localStorageData";

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareJssdk()

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('es-ES')
ZoomMtg.i18n.reload('es-ES')

const Directo = () => {
  const data = getLocalUserdata();

  var signatureEndpoint = 'https://neoestudio.net/api/JwtToken'
  var sdkKey = 'ejMUC7sZJxrReEZ4iLrllWD4iYqM9W6tOqpS'
  var meetingNumber = '4269760334'
  var role = 0
  var leaveUrl = window.location.href
  var userName= '-'
  if(data.userName!==null){
    userName=data.userName
  }
  var userEmail = ''
  var passWord = 'Ehkuc2'
  // pass in the registrant's token if meeting or webinar requires registration.
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
      startMeeting(response.token)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementsByTagName('header')[0].style.display='none';
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);
        
        var translations = ZoomMtg.i18n.getAll("es-ES");
        var overridenTranslations = Object.assign({}, translations, {
         "apac.wc_chat.type_msg": "Escribir mensaje aqu…",
        });
        ZoomMtg.i18n.load(overridenTranslations, 'es-ES');
        ZoomMtg.i18n.reload('es-ES');

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
    <div></div>
  )
}

export default Directo
