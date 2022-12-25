import { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const LoginForm = ({
  blogs,
  setBlogs,
  setUser,
  setNotification,
  notificationPop,
  setErrorNotification,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userInfo = await loginService.login(username, password)
      window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
      blogsService.setToken(userInfo.token)
      const filteredBlogs = blogs.filter(
        (blog) => blog.user.username === userInfo.username
      )
      setBlogs(filteredBlogs)
      setUser(userInfo)
    } catch (error) {
      setNotification('Wrong username or password.')
      setErrorNotification(true)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      {notificationPop()}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            className="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            className="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm
