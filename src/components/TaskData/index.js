import {Component} from 'react'
import './index.css'

class TaskData extends Component {
  render() {
    const {item} = this.props
    return (
      <li className="tasks-lists">
        <div className="tasks-card">
          <p className="tasks-text">{item.tasksText}</p>
          <p className="tags-text">{item.tagsText}</p>
        </div>
      </li>
    )
  }
}

export default TaskData
