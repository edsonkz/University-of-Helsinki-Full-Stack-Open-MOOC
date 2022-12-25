import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogsService from './services/blogs'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [errorNotification, setErrorNotification] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
      blogsService.getAll().then((blogs) => {
        const filteredBlogs = blogs.filter(
          (blog) => blog.user.username === user.username
        )
        filteredBlogs.sort((p1, p2) =>
          p1.likes < p2.likes ? 1 : p1.likes > p2.likes ? -1 : 0
        )
        setBlogs(filteredBlogs)
      })
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotification('')
      setErrorNotification(false)
    }, 4000)
  }, [notification])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreateBlog = async (title, author, url) => {
    const newBlog = await blogsService.create(title, author, url)
    setBlogs(blogs.concat(newBlog))
    setNotification(
      `A new blog ${newBlog.title} by ${newBlog.author} was added`
    )
  }

  const handleAddLike = async (blog) => {
    const newBlog = await blogsService.addLike(blog.id, blog)
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === newBlog.id) {
        const likes = newBlog.likes
        return { ...blog, likes }
      }
      return blog
    })
    updatedBlogs.sort((p1, p2) =>
      p1.likes < p2.likes ? 1 : p1.likes > p2.likes ? -1 : 0
    )
    setBlogs(updatedBlogs)
  }

  const handleRemoveBlog = async (id) => {
    await blogsService.remove(id)
    let oldBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(oldBlogs)
  }

  const notificationPop = () => {
    return (
      <>
        {notification.length > 0 ? (
          !errorNotification ? (
            <h3 className="notification">{notification}</h3>
          ) : (
            <h3 className="notificationError">{notification}</h3>
          )
        ) : (
          <></>
        )}
      </>
    )
  }

  const userForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        {notificationPop()}
        <p>
          {user.name} logged-in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>
        {createForm()}
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleAddLike={handleAddLike}
            handleRemoveBlog={handleRemoveBlog}
          />
        ))}
      </div>
    )
  }

  const createForm = () => {
    return (
      <Togglable buttonLabel="new blog">
        <CreateBlog handleCreateBlog={handleCreateBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          setBlogs={setBlogs}
          setNotification={setNotification}
          blogs={blogs}
          setUser={setUser}
          setErrorNotification={setErrorNotification}
          notificationPop={notificationPop}
        />
      ) : (
        userForm()
      )}
    </div>
  )
}

export default App
