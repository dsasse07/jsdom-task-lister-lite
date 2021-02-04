document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const tasksList = document.querySelector('#tasks')
  const form = document.querySelector("#create-task-form")
  const list = document.querySelector('#list')
  let tasks = []


  //************** Functions **************//

  //
  const createTask = attributes => {
    let li = document.createElement("li")
    let p = document.createElement("p")
    let deleteButton = document.createElement("button")
    let editButton = document.createElement("button")
    p.textContent = attributes.description
    p.className = "task-text"
    p.style.display = "inline-block"

    switch (true){
      case (attributes.priority == 3):
        li.style.color = "red"
        li.dataset.priority = 3
        break
      case (attributes.priority == 2):
        li.style.color = "#FFA100"
        li.dataset.priority = 2
        break
      case (attributes.priority == 1):
        li.style.color = "green"
        li.dataset.priority = 1
        break
    }

    editButton.textContent = "Edit"
    editButton.className = "edit-button"

    deleteButton.textContent = "X"
    deleteButton.className = "delete-button"
    deleteButton.dataset.description = attributes.description

    li.append(p, editButton, deleteButton)
    tasks.push(li)
    li.dataset.id = tasks.indexOf(li)
    renderListItems()
  }

  const renderListItems = li => {
    if (tasks.length > 1) sortTasks()
    tasks.forEach(task => tasksList.appendChild(task))
  }

  const sortTasks = _ => {
    tasks.sort((a,b) => {
      if (b.dataset.priority < a.dataset.priority) return -1
      if (b.dataset.priority > a.dataset.priority) return 1
      return a.textContent.localeCompare(b.textContent)
    })
  }

  //************** Edit Existing Task **************//

  const editTask = item => {
    let value = item.querySelector(".task-text").textContent
    let priority = item.dataset.priority

    let editForm = document.createElement("form")
    editForm.className = "edit-form"

    let textField = document.createElement("input")
    textField.type = "text"
    textField.value = value

    let selectMenu = createEditSelect()
    selectMenu[0].append(selectMenu[1], selectMenu[2], selectMenu[3])
    selectMenu[parseInt(priority)].selected = true
    
    let saveButton = document.createElement("button")
    saveButton.className = "save-button"
    saveButton.textContent = "Save"

    editForm.append(textField, selectMenu[0], saveButton)
    item.textContent = ""
    item.append(editForm)
  }

  const createEditSelect = _ => {
    let select = document.createElement("select")
    let option1 = document.createElement("option")
    option1.value = 1
    option1.textContent = "Low"
    let option2 = document.createElement("option")
    option2.value = 2
    option2.textContent = "Medium"
    let option3 = document.createElement("option")
    option3.value = 3
    option3.textContent = "High"
    return [select, option1, option2, option3]
  }

  const updateTask = (item, attributes) => {
    let p = document.createElement("p")
    let deleteButton = document.createElement("button")
    let editButton = document.createElement("button")
    p.textContent = attributes.description
    p.className = "task-text"
    p.style.display = "inline-block"

    switch (true){
      case (attributes.priority == 3):
        item.style.color = "red"
        item.dataset.priority = 3
        break
      case (attributes.priority == 2):
        item.style.color = "#FFA100"
        item.dataset.priority = 2
        break
      case (attributes.priority == 1):
        item.style.color = "green"
        item.dataset.priority = 1
        break
    }

    editButton.textContent = "Edit"
    editButton.className = "edit-button"

    deleteButton.textContent = "X"
    deleteButton.className = "delete-button"
    deleteButton.dataset.description = attributes.description

    item.append(p, editButton, deleteButton)
    renderListItems()
  }

  // EVENT LISTENERS
  
  form.addEventListener('submit', e => {
    e.preventDefault()
    let attributes = {
      description: e.target[0].value + ' ', 
      priority: e.target[1].value
      }
    createTask(attributes)
    e.target.reset()
    renderListItems()
  })

  list.addEventListener('submit', e => {
    if (e.target.className === "edit-form") {
        e.preventDefault()
        let attributes = {
          description: e.target[0].value + ' ', 
          priority: e.target[1].value
        }
        updateTask(e.target.closest("li"), attributes)
        e.target.remove()
    }
  })



  tasksList.addEventListener('click', e => {
    switch (true){
      case (e.target.className === "delete-button"):
        let index = e.target.closest("li").dataset.id
        tasks = tasks.splice(index,1) /// DELETE THIS INDEX
        e.target.parentElement.remove()
        break
      case (e.target.className === "edit-button"):
        editTask(e.target.closest("li"))
        break
    }
  })

})

