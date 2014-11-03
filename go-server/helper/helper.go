// Package helper provides methods which simplify logic independent operations
package helper

import (
	"encoding/json"
	"strconv"
)

// Response is a structure with data about sudoku resolution
type Response struct {
	Status bool         // True = solved, False = not solved
	Matrix [9][9]string // If solved, correct matrix is stored here
	Error  string       // If not solved, error message is stored here
}

// StringMatrixToIntMatrix converts matrix of strings to matrix of ints
func StringMatrixToIntMatrix(stringMatrix [9][9]string) (intMatrix [9][9]int) {
	for rowIndex := range stringMatrix {
		for colIndex := range stringMatrix[rowIndex] {
			intMatrix[rowIndex][colIndex], _ = strconv.Atoi(stringMatrix[rowIndex][colIndex])
		}
	}
	return
}

// IntMatrixToStringMatrix converts matrix of ints to matrix of strings
func IntMatrixToStringMatrix(intMatrix [9][9]int) (stringMatrix [9][9]string) {
	for rowIndex := range stringMatrix {
		for colIndex := range stringMatrix[rowIndex] {
			stringMatrix[rowIndex][colIndex] = strconv.Itoa(intMatrix[rowIndex][colIndex])
		}
	}
	return
}

// BuildResponse creates successfull or failed JSON response
func BuildResponse(status bool, matrix [9][9]int) string {
	r := new(Response)
	r.Status = status
	if status {
		// Sudoku was solved
		r.Matrix = IntMatrixToStringMatrix(matrix)
	} else {
		// Sudoku was not solved
		r.Error = "This sudoku can't be solved; Check it and try again"
	}
	resultJSON, _ := json.Marshal(r)
	return string(resultJSON)
}
