for(let i = 0 ; i < 100 ; i++)
{
     document.getElementById('c' + i).addEventListener("click", function(){ checkField(i);  });
}
const size = 10;
var board = new Array(size*size);
var allFields = fieldsLeft + minesLeft;
var fieldsLeft = 90;
var minesLeft = 20;
var countScore = 0;
var lock = false;


for (var i = 0; i < 100; i++)
{
	board[i] = 0;
}

/*board[0] = 1;
board[10] = 1;
board[11] = 1;
board[15] = 1;
board[22] = 1;
board[26] = 1;
board[33] = 1;
board[36] = 1;
board[57] = 1;
board[78] = 1;
board[88] = 1;*/
board[33] = 1;
board[91] = 1;
board[93] = 1;
board[98] = 1;

var my_random = 0;
var my_random2 = 1;

for (var i = 0; i < 20; i++)
{
	my_random = Math.floor(Math.random()*100);  // 0-99
	my_random2 = my_random;

	if (board[my_random] == 1 && board[my_random] == board[my_random2])
	{
		i--;
	}
	else
	{
		board[my_random] = 1;
	}
}

// 1 BOMB






function checkField(number)
{
		var cursorValue = $('#C'+number).css('cursor');
			if (lock == false)
			{
			if (board[number] == 0 ) // 0 NO BOMB
			{
				var image = "url(img/" + howMines(number) + ".png)";
				countScore++; 
				$('#c' + number).css('background-image', image);
				$('#c' + number).css('cursor', 'default');
				if (howMines(number) == 0)
				{
					discoverZeroFields(number);
					discoverZeroLeftFields(number);	
				}

				$('.score').html('Turn counter: ' + countScore);
				fieldsLeft--;
			}
			else  // BOMB
			{
				$('#c' + number).css('background-image', 'url(img/mina.jpg)');
				$('#c' + number).css('cursor', 'default');
				countScore++; 
				$('.score').html('Turn counter: ' + countScore);
				setTimeout(function() { discoverFields() }, 350);
				lock = true;
			}
	}
	

}

function discoverFields()
{
	for (var i = 0; i < 100; i++)
	{
		if (board[i] == 1)
		{
			$('#c' + i).css('background-image', 'url(img/mina.jpg)');
			$('#c' + i).css('cursor', 'default');
		}
		if (board[i] == 0)
		{
			var image = "url(img/" + howMines(i) + ".png)";
			$('#c' + i).css('background-image', image);
			$('#c' + i).css('cursor', 'default');

		}
	}
}



function discoverZeroFields(number)
{
		var fieldZero = true;
		var fieldZero1 = true;
		var i = number;
		var newField = number;
		var opposedField = number - 1;
		var newField1 = newField;
		var newField2 = newField;
		var newField3 = newField;
		var newField4 = newField;


		var zm1 = 1;
		var zm2 = 1;
		var zm3 = 1;
		var zm4 = 1;
		var image3 = "url(img/0.png)";
		for (var j = 0; j < 10; j++)   // dolna, gorna, prawa strona
		{

			if (howMines(newField) == 0)  // odkrywanie poziomo w prawo
			{
				$('#c' + newField).css('background-image', image3);
				$('#c' + newField).css('cursor', 'default');
				newField++;
				newField3 = newField;
				newField4 = newField;
				for (var k = 0; k < 100; k+=10) // odkrywanie w dol
					{
						if (howMines(newField3 + k) == 0 && (newField3 + k) % 10 != 0)
						{
							$('#c' + (newField3 + k)).css('background-image', image3);
							$('#c' + (newField3 + k)).css('cursor', 'default');
						}
						else
						{
							k += 100; // po za plansze
						}
					}

				for (var k = 0; k < 100; k+=10) // odkrywanie w gore
					{
						if (howMines(newField4 - k) == 0 && (newField4 - k) % 10 != 0)
						{
							$('#c' + (newField4 - k)).css('background-image', image3);
							$('#c' + (newField4 - k)).css('cursor', 'default');
						}
						else
						{
							k += 100; // po za plansze
						}
					}
			}

				if (howMines(newField1) == 0 && newField1 <= 100)  // odkrywanie pionowo w dol
				{
					$('#c' + newField1).css('background-image', image3);
					$('#c' + newField1).css('cursor', 'default');        
					newField1 = newField1 + 10;

					for (var k = 0; k < 10; k++)   // odkrywanie w prawo
					{
						if (howMines(newField1 + k) == 0 && (newField1 + k) % 10 != 0)
						{
							$('#c' + (newField1 + k)).css('background-image', image3);
							$('#c' + (newField1 + k)).css('cursor', 'default');
						}
						else
							k += 10; // end for
					}

					
				}
				if (howMines(newField2) == 0 && newField2 >= 0)  // odkrywanie pionowo w gore
				{
					$('#c' + newField2).css('background-image', image3);
					$('#c' + newField2).css('cursor', 'default');
					newField2 = newField2 - 10;

					for (var k = 0; k < 10; k++)   // odkrywanie w prawo
					{
						if (howMines(newField2 + k) == 0 && (newField2 + k) % 10 != 0)
						{
							$('#c' + (newField2 + k)).css('background-image', image3);
							$('#c' + (newField2 + k)).css('cursor', 'default');
						}
						else
							k += 10; // end for
					}	
				}
		} // end main for
}


function discoverZeroLeftFields(number)
{
	var newField = number;
	var image3 = "url(img/0.png)";
	var newField4 = newField;
	var newField3 = newField;

	for (var j = 0; j < number % 10; j++)   // left side
	{

			if (howMines(newField) == 0)  // discover left landscape
			{
				
				$('#c' + newField).css('background-image', image3);
				$('#c' + newField).css('cursor', 'default');
				newField--;
				
				if(howMines(newField) == 0 && (newField % 10 != 9))
				{
					$('#c' + newField).css('background-image', image3);
					$('#c' + newField).css('cursor', 'default');
				}

				newField3 = newField;
				newField4 = newField;



					for (var k = 0; k < 100; k+=10) // discover lower
					{
						if (howMines(newField3 + k) == 0 && (newField3 + k) % 10 != 9)
						{
							$('#c' + (newField3 + k)).css('background-image', image3);
							$('#c' + (newField3 + k)).css('cursor', 'default');
			
						}
						else
							k += 100; // end for
					}

					for (var k = 0; k < 100; k+=10) // discover upper
					{
						if (howMines(newField4 - k) == 0 && (newField4 - k) % 10 != 9)
						{
							$('#c' + (newField4 - k)).css('background-image', image3);
							$('#c' + (newField4 - k)).css('cursor', 'default');
						}
						else
							k += 100; // end for
					}
			}
	}
}
			




function howMines(number)
{ 
	var minesNear = 0;

	if ((number % 10 == 0) && (Math.floor(number / 10 == 9)))  // left lower corner
	{
		if(board[number - 10] == 1)
		minesNear++;
		if(board[number - 9] == 1)
			minesNear++;
		if(board[number + 1] == 1)
			minesNear++;
	}
	else if ((number % 10 == 9) && (Math.floor(number / 10 == 9)))   // right lower corner
	{
		if(board[number - 11] == 1)
		minesNear++;
		if(board[number - 10] == 1)
			minesNear++;
		if(board[number - 1] == 1)
			minesNear++;
	}
	else if ((number % 10 == 0) && (Math.floor(number / 10 == 0)))  // left upper corner
	{
		if(board[number + 11] == 1)
		minesNear++;
		if(board[number + 10] == 1)
			minesNear++;
		if(board[number + 1] == 1)
			minesNear++;
	}
	else if ((number % 10 == 9) && (Math.floor(number / 10 == 0)))   // right upper corner
	{
		if(board[number + 10] == 1)
		minesNear++;
		if(board[number + 9] == 1)
			minesNear++;
		if(board[number - 1] == 1)
			minesNear++;
	}
	else if (number % 10 == 9)   // right side
	{
		if(board[number - 1] == 1)
		minesNear++;
		if(board[number - 10] == 1)
		minesNear++;
		if(board[number - 11] == 1)
		minesNear++;
		if(board[number + 9] == 1)
		minesNear++;
		if(board[number + 10] == 1)
		minesNear++;
	}
	else if (Math.floor(number / 10 == 9))  // lower side
	{
		if(board[number - 11] == 1)
		minesNear++;
		if(board[number - 10] == 1)
			minesNear++;
		if(board[number - 9] == 1)
			minesNear++;
		if(board[number - 1] == 1)
			minesNear++;
		if(board[number + 1] == 1)
			minesNear++;
	}
	else if (number % 10 == 0)  // left side
	{
		if(board[number - 10] == 1)
		minesNear++;
		if(board[number - 9] == 1)
		minesNear++;
		if(board[number + 1] == 1)
		minesNear++;
		if(board[number + 10] == 1)
		minesNear++;
		if(board[number + 11] == 1)
		minesNear++;
	}
	else if (Math.floor(number / 10 == 0))   // upper side
	{
		if(board[number - 1] == 1)
		minesNear++;
		if(board[number + 1] == 1)
			minesNear++;
		if(board[number + 9] == 1)
			minesNear++;
		if(board[number + 10] == 1)
			minesNear++;
		if(board[number + 11] == 1)
			minesNear++;
	} // center fields
	else
	{
	if(board[number - 11] == 1)
		minesNear++;
	if(board[number - 10] == 1)
		minesNear++;
	if(board[number - 9] == 1)
		minesNear++;
	if(board[number - 1] == 1)
		minesNear++;
	if(board[number + 1] == 1)
		minesNear++;
	if(board[number + 9] == 1)
		minesNear++;
	if(board[number + 10] == 1)
		minesNear++;
	if(board[number + 11] == 1)
		minesNear++;
	}
	

	//i - 11   i - 10   i - 9
	//i - 1      i      i + 1
	//i + 9    i + 10   i + 11

	return minesNear;
}
