## So the change I am trying to make is there is a part in the email and join pilot in the first page all the way at the bottom it is currently way to thick so I am trying to make changes to it.

.page-home .pilot-footer-form .form-input,
.page-home .pilot-footer-button{
    min-height: 0; 
    height: 100% 
}

Above it you need to change the height from 3.7 to 3.

Why: 
.form-input=all inputs
.pilot-footer-form .form-input=1 input

min-height: 0; //Overide so that it doesnt effect all the .form-input 
    height: 100% //without this the child is allowed to shrink, but you are not telling it to fill parents height

Parent: .pilot-footer-form
Children: .form-input
.pilot-footer-button

## An issue that I had was was the Three Simple Steps. One Better Trip. was not indenting the way I wanted, the way I want it to be is

Three Simple Steps.
One Better Trip

What you need to do is froce indentation How:

<h2>
  Three simple steps.<br>
  One better trip.
</h2>

<h2> starts a level-two heading.
<br> creates a line break.
</h2> ends the heading.