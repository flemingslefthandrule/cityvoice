import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const axiostestcomp = () => {

const [csrftoken, setcsrftoken] = useState('')

useEffect(() => {
    const fetchcsrftoken = async () => {
      const response = await fetch('/user/csrf/')

      if (response.ok) {
        const cookie = document.cookie

        const csrfRegex = /csrftoken=(.*?);/
        const matches = csrfRegex.exec(cookie)

        if (matches) {
          setcsrftoken(matches[1])
        } else {
          console.error('CSRF token not found in cookie')
        }
      } else {
        console.error('Failed to fetch CSRF token')
      }
    }

    fetchcsrftoken()
  }, [])

}

const baseUrl = "http://127.0.0.1:8000/"
const csrfToken = Cookies.get('csrftoken')
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'


export default axios.create({
    baseURL: baseUrl
})

export const cat = axios.create({
    baseURL: baseUrl,
    headers:{"Content-Type":"application/json"},
    withCredentials: true
})

axios.defaults.headers.common['X-CSRFToken'] = csrfToken
cat.defaults.headers.common['X-CSRFToken'] = csrfToken