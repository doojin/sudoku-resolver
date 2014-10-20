package main

import (
    "net/http"
    
    "github.com/gorilla/mux"
    "code.google.com/p/log4go"
    
    "./handlers"
)

func main() {
    log4go.Info("Application started")
    
    r := mux.NewRouter()
    
    r.HandleFunc("/", handlers.NewSudokuHandler)
    
    http.Handle("/", r)
    http.ListenAndServe(":8080", nil)
}