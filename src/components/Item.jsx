import { useState } from "react"

export default function Item({title, id, status}){

    const [checked, setChecked] = useState(status)
    const classes = ['todo']

    if (checked) {
        classes.push('status')
    }

    //

    const updateStatus = () => {
        setChecked(!checked)
        const storedTodos = JSON.parse(localStorage.getItem('tasks'))

        storedTodos.map((e) => {
            if (e.id === id) {
                e.status = !checked
            }
            return true
        })
        localStorage.setItem('tasks', JSON.stringify(storedTodos))
    }

    //

    const [visible, setVisible] = useState(true)
    const removeElement = () => {
        setVisible(prev => !prev)
        const storedTodos = JSON.parse(localStorage.getItem('tasks'))
        let removeTodos = storedTodos.filter(e => {
            if (e.id !== id) {
                return true             
            }
            return false
        })
        localStorage.setItem('tasks', JSON.stringify(removeTodos))
    }

    //

    return(
        <>
            {visible && (
                <li className={classes.join(' ')}>
                    <label>
                        <input type="checkbox" checked={checked} onChange={updateStatus}/>
                        <span>{title}</span>
                        <i className="material-icon red-text" onClick={removeElement}>X</i>
                    </label>
                </li>
            )}   
        </>
    )
}
