document.addEventListener('DOMContentLoaded', (event) => {
    let timerDisplay = document.querySelector('.timer');
    let startPauseButton = document.querySelector('.interactbuttons .button:first-child');
    let resetButton = document.querySelector('.interactbuttons .button:nth-child(2)');
    let addTimeButtons = document.querySelectorAll('.add-time');
    const taskCountDisplay = document.querySelector('.taskcount');
   
    
    let timer = null;
    let timeInSeconds = JSON.parse(localStorage.getItem('timeInSeconds')) || 0;
    let lastUpdateTime = null;

    function updateTimerDisplay() {
        let hours = Math.floor(timeInSeconds / 3600);
        let minutes = Math.floor((timeInSeconds % 3600) / 60);
        let seconds = Math.floor(timeInSeconds % 60);
        timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        localStorage.setItem('timeInSeconds', JSON.stringify(timeInSeconds));

        if (timeInSeconds <= 0) {
            resetButton.disabled = true;
            resetButton.classList.add('disabled');
        } else {
            resetButton.disabled = false;
            resetButton.classList.remove('disabled');
        }
    }
    
    function startTimer() {
        if (!timer && timeInSeconds > 0) {
            lastUpdateTime = performance.now();
            timer = requestAnimationFrame(tick); 
            startPauseButton.textContent = 'Pause';
        }
    }

    function pauseTimer() {
        if (timer) {
            cancelAnimationFrame(timer);
            timer = null;
            startPauseButton.textContent = 'Start';
        }
    }

    function resetTimer() {
        pauseTimer();
        timeInSeconds = 0;
        updateTimerDisplay();
    }

    function tick() {
        const now = performance.now();
        const deltaTime = (now - lastUpdateTime) / 1000; 
        lastUpdateTime = now;

        timeInSeconds -= deltaTime;
        if (timeInSeconds <= 0) {
            timeInSeconds = 0;
            pauseTimer();
            
        }
        updateTimerDisplay();
        
        if (timeInSeconds > 0) {
            timer = requestAnimationFrame(tick);
        }
    }

    startPauseButton.addEventListener('click', () => {
        if (timer) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetButton.addEventListener('click', resetTimer);

    addTimeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            timeInSeconds += parseInt(event.target.getAttribute('data-time'));
            updateTimerDisplay();
        });
    });

    updateTimerDisplay();

    const taskList = document.querySelector('.tasklist');
    const addTaskButton = document.getElementById('addtask');
    const removeTaskButton = document.getElementById('remove-task');
    const taskInput = document.querySelector('.input');

    const loadTasks = () => {
        taskList.innerHTML = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskElement = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskElement);
        });
        updateTaskCount();
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('.tasks').forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector('.task-text').textContent,
                completed: taskElement.classList.contains('task-completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskCount();
    };

    const createTaskElement = (text, completed = false) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('tasks');
        if (completed) taskElement.classList.add('task-completed');

        const label = document.createElement('label');
        label.classList.add('custom-checkbox');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = completed;

        checkbox.addEventListener('change', () => {
            taskElement.classList.toggle('task-completed', checkbox.checked);
            saveTasks();
        });

        const customCheckboxMark = document.createElement('span');
        customCheckboxMark.classList.add('custom-checkbox-mark');

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = text;

        label.appendChild(checkbox);
        label.appendChild(customCheckboxMark);
        label.appendChild(taskText);
        taskElement.appendChild(label);

        return taskElement;
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
            saveTasks();
            taskInput.value = '';
        }
    });

    document.getElementById('clear-tasks').addEventListener('click', () => {
        document.querySelectorAll('.tasks').forEach(taskElement => {
            taskElement.remove();
        });
        saveTasks();
    });

    const notepad = document.querySelector('.notepad');

    function loadNotepad() {
        const savedContent = localStorage.getItem('notepadContent');
        if (savedContent) {
            notepad.innerHTML = savedContent;
        }
    }

    loadNotepad();

    function saveNotepad() {
        localStorage.setItem('notepadContent', notepad.innerHTML);
    }

    const saveButton = document.querySelector('.save-notepad');
    saveButton.addEventListener('click', saveNotepad);

    removeTaskButton.addEventListener('click', () => {
        document.querySelectorAll('.task-completed').forEach(taskElement => {
            taskElement.remove();
        });
        saveTasks();
    });

    const updateTaskCount = () => {
        const totalTasks = document.querySelectorAll('.tasks').length;
        const completedTasks = document.querySelectorAll('.task-completed').length;
        taskCountDisplay.textContent = `TASKS (${completedTasks}/${totalTasks})`;
    };

    const container = document.querySelector('.datetime.taskform');

    function updateDateTime() {
        const now = new Date();

        const day = now.toLocaleDateString('en-US', { weekday: 'long' });
        const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});

        container.innerHTML = `
            <div class="day">${day}</div>
            <div class="date">${date}</div>
            <div class="time">${time}</div>
        `;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadTasks();
});
// Get elements
const notepad = document.querySelector('.notepad');
const fullscreenButton = document.getElementById('fullscreen-notepad');
const closeFullscreenButton = document.getElementById('close-fullscreen-notepad');

// Open Fullscreen
fullscreenButton.addEventListener('click', () => {
    notepad.classList.add('fullscreen');
    fullscreenButton.style.display = 'none';
    closeFullscreenButton.style.display = 'inline-block';
});

// Close Fullscreen
closeFullscreenButton.addEventListener('click', () => {
    notepad.classList.remove('fullscreen');
    closeFullscreenButton.style.display = 'none';
    fullscreenButton.style.display = 'inline-block';
});
