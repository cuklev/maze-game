# Task Description

Your task, should you choose to accept it, is to create an
artificial agent that will be able to escape the mazes
on the right.
Your agent will start at the entrance on the left side
of the maze and it much the exit located on the right.
In order to this, you must complete the function bellow
which determines the agents next actions.
The function is given 5 arguments:

* 4 boolean values (up, left, right, down): these tell your
     agent whether it can move in the given direction.
     If true, then the given move is valid.
* 1 string value (from) - this is a string telling your agent
    the direction from which it came from.
    It can be 'up', 'left', 'right' or 'down'.

The function must return a string determining the agents next move.
Valid values are the same as for the from parameter.
If the function returns an invalid value for the current step
(invalid string name or the given direction has a wall) your
agent will fail the task.
