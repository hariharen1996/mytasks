import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskData from '../TaskData/index'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    tasksText: '',
    tagsText: tagsList[0].optionId,
    data: [],
    activeTasks: 'active',
  }

  changeTasks = event => {
    this.setState({tasksText: event.target.value})
  }

  changeTags = event => {
    this.setState({tagsText: event.target.value})
  }

  submitTasks = event => {
    event.preventDefault()
    const {tasksText, tagsText} = this.state
    const newData = {
      id: uuidv4(),
      tasksText,
      tagsText,
    }

    if (tasksText !== '' && tagsText !== '') {
      this.setState(prevState => ({
        data: [...prevState.data, newData],
        tasksText: '',
        tagsText: '',
      }))
    }
  }

  changeTabs = event => {
    this.setState(prevState => ({
      activeTasks:
        prevState.activeTasks === event.target.value
          ? 'active'
          : event.target.value,
    }))
  }

  render() {
    const {tasksText, tagsText, activeTasks, data} = this.state
    const filteredTasks =
      activeTasks === 'active'
        ? data
        : data.filter(item => item.tagsText === activeTasks)
    console.log(tagsText)

    return (
      <div className="main-container">
        <div className="form-container">
          <h1 className="form-heading">Create a Task!</h1>
          <form className="form" onSubmit={this.submitTasks}>
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              className="input"
              placeholder="Enter the task here"
              value={tasksText}
              onChange={this.changeTasks}
              id="task"
            />
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              className="input"
              onChange={this.changeTags}
              value={tagsText}
              id="tags"
            >
              {tagsList.map(item => (
                <option key={item.optionId} value={item.optionId}>
                  {item.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="tasks-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-button">
            {tagsList.map(item => {
              const isTagsActive = activeTasks === item.optionId
              return (
                <li className="btn-lists" key={item.optionId}>
                  <button
                    type="button"
                    className={isTagsActive ? 'tags-btn active' : 'tags-btn'}
                    onClick={this.changeTabs}
                    value={item.optionId}
                  >
                    {item.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          {data.length !== 0 ? (
            <ul className="tasks-items">
              {filteredTasks.map(item => (
                <TaskData item={item} key={item.id} />
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
