
# JFlashcard

Is a Frontend React based application, written in Typescript, to easly repeat using JSON flashcards, in particular this project is the dual of [FlashGenAI](https://github.com/Fraccos/FlashGenAI), that generate JSON Flashcard from the text of a given PDF.

This is a project built in less than **24 hours** as a way to improve my study workflow as a Computer Engineering student, but this tools can be used for every kind of subjects.


## Features

- Easy to use UI
- Mobile Friendly
- Iterate over the wrong answer: improve at every cycle!
- Support auto generated flashcard by [FlashGenAI](https://github.com/Fraccos/FlashGenAI)


## Installation

To use this Web App is needed the file *quiz.json* in the public folder, here an example:

```json
  {
        "title": "Introduction to Algorithms MIT",
        "questions": [  
            {
                "name": "Sorting",
                "file": "MIT_sort.json",
                "type": "flashcard"
            }
        ]
    }
```
The *quiz.json* store the information about which quiz are avaible and their section, (in this example there is only the Sorting section).

All the section files **must** be inside the public directory under the */json/* and the section files are json, here an example:


```json
{
	"filename": "MIT_sort.pdf",
	"cards": [{
		"3": [
			{
				"question": "What is selection sort?",
				"answer": "Selection sort is a sorting algorithm that finds the largest number in the prefix of an array and swaps it to the current position, then recursively sorts the remaining prefix."
			},
			{
				"question": "Can you provide an example of selection sort?",
				"answer": "Sure! [8, 2, 4, 9, 3] can be sorted using selection sort as [8, 2, 4, 3, 9], [3, 2, 4, 8, 9], [3, 2, 4, 8, 9], [2, 3, 4, 8, 9]."
			},
			{
				"question": "What is the time complexity of selection sort?",
				"answer": "The time complexity of selection sort is O(n^2), where n is the number of elements in the array."
			},
			{
				"question": "What is the space complexity of selection sort?",
				"answer": "The space complexity of selection sort is O(1) because it sorts the array in-place without using any additional space that grows with the input size."
			},
			{
				"question": "What is the purpose of the prefix_max function?",
				"answer": "The prefix_max function returns the index of the maximum element in the prefix of an array."
			},
			{
				"question": "How does the prefix_max function work?",
				"answer": "The prefix_max function uses recursion to find the index of the maximum element in the prefix by comparing elements one by one and returning the maximum index."
			},
			{
				"question": "What is the time complexity of the prefix_max function?",
				"answer": "The time complexity of the prefix_max function is O(n), where n is the length of the prefix."
			},
			{
				"question": "What is the space complexity of the prefix_max function?",
				"answer": "The space complexity of the prefix_max function is O(1) as it uses a constant amount of space for the variables."
			},
			{
				"question": "What is the base case for selection sort?",
				"answer": "The base case for selection sort is when the array has only one element, which is already sorted."
			},
			{
				"question": "What is the induction step for selection sort?",
				"answer": "The induction step for selection sort states that if the algorithm is correct for the last element, then the last element of the sorted output is the largest number of the array, and the remaining prefix is sorted."
			}
		]
	}]
}
```
