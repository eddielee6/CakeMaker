Blackboard = function(baseX, baseY) {
	var sender = this;

	//State
	var _tasks = new Array();
	var enabled = true;
	var callbackQueue = new Array();

	var _group = new Kinetic.Group();
	var _contentGroup = new Kinetic.Group();
	var _currentSubTasks = new Kinetic.Group();

	var blackboard = new Kinetic.Image({
		x: baseX,
		y: baseY,
		image: resourceManager.getImage("blackboard"),
		width: 391,
		height: 260.5
	});
	_group.add(blackboard);

	var currentTaskHeading = new Kinetic.Text({
		x: baseX + 24,
		y: baseY + 27,
		text: "Current task",
		fontFamily: "sunshine",
		fontSize: 20,
		textFill: "#eee",
		opacity: 0.9
	});
	_contentGroup.add(currentTaskHeading);

	var task = new Kinetic.Text({
		x: baseX + 24,
		y: baseY + 27 + currentTaskHeading.getHeight() + 10,
		fontFamily: "sunshine",
		fontSize: 13,
		textFill: "#eee",
		opacity: 0.9,
		lineHeight: 1.8
	});
	_contentGroup.add(task);
	_contentGroup.add(_currentSubTasks);
	_group.add(_contentGroup);

	
	var getTaskForId = function(id) {
		for (var i = 0; i < _tasks.length; i++) {
			if(_tasks[i].id == id) {
				return _tasks[i];
			}
		};
	};

	var wrapText = function(text, maxWidth) {
		var words = text.split(' ');
		var textText = new Kinetic.Text({fontFamily: "sunshine", fontSize: 13});
		var line = "";
        var output = "";

        for(var n = 0; n < words.length; n++) {
        	var oldOutput = line;
        	line = oldOutput + words[n] + ' ';
        	textText.setText(line);
        	if(textText.getWidth() > maxWidth) {
        		output += oldOutput + '\n'
        		line = "";
        		n--;
        	}
        }
        output += line;
       	return output;
	};

	this.AddTask = function(id, task, dependentTasks, subTasks) {
		if(enabled) {
			_tasks.push({
				id: id,
				task: task,
				dependentTasks: dependentTasks,
				subTasks: subTasks,
				completed: false
			});
		}
	};

	this.IsTaskComplete = function(taskId) {
		return getTaskForId(taskId).completed;
	};

	this.AreDependentTasksComplete = function(dependentTasks) {
		if(!dependentTasks) return true;
		for (var i = 0; i < dependentTasks.length; i++) {
			if(!sender.IsTaskComplete(dependentTasks[i])) return false;
		};
		return true;
	};

	this.SubtaskCompleted = function(taskId, subtaskNumber) {
		if(enabled) {
			var selectedTask = getTaskForId(taskId);
			if(!selectedTask.subTasks[subtaskNumber].completed && sender.AreDependentTasksComplete(selectedTask.dependentTasks)) {
				selectedTask.subTasks[subtaskNumber].completed = true;

				var statusResolved = false;
				var allTasksCompleted = true;
				for (var i = 0; i < selectedTask.subTasks.length; i++) {
					var status = selectedTask.subTasks[i].completed;
					if(!status) {
						status = (selectedTask.subTasks[i].calculated && selectedTask.subTasks[i].calculated());
						if(status && selectedTask.subTasks[i].completeCallback) {
							callbackQueue.push({
								callback: selectedTask.subTasks[i].completeCallback,
								subtaskId: i
							});
						}
					}
					selectedTask.subTasks[i].completed = status;
					if(!status && !statusResolved) {
						statusResolved = true;
						allTasksCompleted = false;
					}
				};

				if(allTasksCompleted) {
					selectedTask.completed = true;
				}

				if(selectedTask.subTasks[subtaskNumber].completeCallback) {
					if(!selectedTask.subTasks[subtaskNumber].callbackFired) {
						selectedTask.subTasks[subtaskNumber].callbackFired = true;
						callbackQueue.push({
							callback: selectedTask.subTasks[subtaskNumber].completeCallback,
							subtaskId: subtaskNumber
						});
					}
				}
			}

			callbackQueue.sort(function(a, b) {
				return a.subtaskId - b.subtaskId;
			});
			for (var i = 0; i < callbackQueue.length; i++) {
				//console.log("Now running " + taskId + " " + callbackQueue[i].subtaskId);
				callbackQueue[i].callback();
				redrawBoardContent();
			};
			callbackQueue = new Array();

			redrawBoardContent();
		}
	};

	this.IsSubtaskComplete = function(taskId, subtaskNumber) {
		var selectedSubtask = getTaskForId(taskId).subTasks[subtaskNumber];

		if(!sender.AreDependentTasksComplete(getTaskForId(taskId).dependentTasks)) {
			return false;
		}

		if(selectedSubtask.completed) {
			return true;
		} else {
			if(selectedSubtask.calculated) {
				var calculatedState = selectedSubtask.calculated();
				if(calculatedState) {
					sender.SubtaskCompleted(taskId, subtaskNumber);
				}
			} else {
				return false;
			}
		}
	};

	// this.ExplicitlyCompleteTask = function(taskId, subtaskNumber) {
	// 	var selectedTask = getTaskForId(taskId);
	// 	if(!selectedTask.subTasks[subtaskNumber].completed && !selectedTask.subTasks[subtaskNumber].callbackFired) {
	// 		selectedTask.subTasks[subtaskNumber].callbackFired = true;
	// 		selectedTask.subTasks[subtaskNumber].completed = true;
	// 		if(selectedTask.subTasks[subtaskNumber].completeCallback) {
	// 			selectedTask.subTasks[subtaskNumber].completeCallback();
	// 			console.log("Exicuting " +taskId + " - " + subTaskNumber);
	// 		}
	// 	}
	// };

	var redrawBoardContent = function() {
		if(enabled) {
			_currentSubTasks.removeChildren();
			redraw();
			for (var i = 0; i < _tasks.length; i++) {
				if(!_tasks[i].completed) {

					task.setText(wrapText(_tasks[i].task, 330));

					if(_tasks[i].subTasks) {
						var subTaskY =  task.getY() + task.getHeight() + 5;
						for (var subTaskNumber = 0; subTaskNumber < _tasks[i].subTasks.length; subTaskNumber++) {

							var isCompleted = sender.IsSubtaskComplete(_tasks[i].id, subTaskNumber);

							var currentSubTask = new Kinetic.Text({
								x: baseX + 30,
								y: subTaskY,
								fontFamily: "sunshine",
								fontSize: 10,
								textFill: (isCompleted ? "#349639" : "#EEEEEE"),
								opacity: 0.9,
								lineHeight: 1.7,
								text: '\u2022 ' + _tasks[i].subTasks[subTaskNumber].description + (isCompleted ? ' \u2713' : '')
							});
							subTaskY += currentSubTask.getHeight();
							_currentSubTasks.add(currentSubTask);
							
						};
					}
					break;
				}
			};
			redraw();
		}
	};

	this.PrintTaskDebugInfo = function() {
		for (var i = 0; i < _tasks.length; i++) {
			console.log(_tasks[i].id + " is " + _tasks[i].completed);
			for (var j = 0; j < _tasks[i].subTasks.length; j++) {
				console.log(" - " + j + " is " + _tasks[i].subTasks[j].completed);
			};
		};
	};

	this.StartTrackingTasks = function() {
		redrawBoardContent();
	};

	this.Disable = function() {
		enabled = false;
		_contentGroup.hide();
		currentTaskHeading.setX(blackboard.getX());
		currentTaskHeading.setWidth(blackboard.getWidth());
		currentTaskHeading.setY(blackboard.getY() + 80);
		currentTaskHeading.moveTo(_group);
		currentTaskHeading.setAlign("center");
		currentTaskHeading.setLineHeight(1.8);
		currentTaskHeading.setText("You're in blind mode.\nGood luck!");
		redraw();
	};

	this.GetGroup = function() {
		return _group;
	};

	var redraw = function() {
		_group.getLayer().draw();
	};
};