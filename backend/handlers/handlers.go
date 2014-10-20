package handlers

import (
    "net/http"
    "html/template"
    "log"
)

// Handler for the homepage (new sudoku field)
func NewSudokuHandler(w http.ResponseWriter, r *http.Request) {
    tpl, err := template.ParseFiles("templates/new_sudoku.template")
    if err != nil {
        log.Fatal(err)
    }
    err = tpl.Execute(w, []interface{}{})
    if err != nil {
        log.Fatal(err)
    }
}