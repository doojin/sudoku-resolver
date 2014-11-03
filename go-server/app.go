package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"./helper"

	"github.com/doojin/gosudoku"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/post-sudoku", PostSudokuHandler).Methods("POST")

	http.Handle("/", r)
	http.ListenAndServe(":8081", nil)
}

// PostSudokuHandler handles sudoku solve request
func PostSudokuHandler(w http.ResponseWriter, r *http.Request) {
	// Getting matrix json from Node.js server
	stringMatrix := [9][9]string{}
	matrixJSON := r.FormValue("matrix")

	// Unmarshaling matrix json
	json.Unmarshal([]byte(matrixJSON), &stringMatrix)

	// Convertin matrix
	intMatrix := helper.StringMatrixToIntMatrix(stringMatrix)

	// Resolving sudoku
	sudoku := new(gosudoku.Sudoku)
	sudoku.Numbers = intMatrix
	solved := sudoku.Resolve()

	// Creating response for Node.js server
	response := helper.BuildResponse(solved, sudoku.Numbers)
	fmt.Fprint(w, response)
}
