// Package helper provides methods which simplify logic independent operations
package helper

import "strconv"

// StringMatrixToIntMatrix converts matrix of strings to matrix of ints
func StringMatrixToIntMatrix(stringMatrix [9][9]string) (intMatrix [9][9]int) {
	for rowIndex := range stringMatrix {
		for colIndex := range stringMatrix[rowIndex] {
			intMatrix[rowIndex][colIndex], _ = strconv.Atoi(stringMatrix[rowIndex][colIndex])
		}
	}
	return
}
