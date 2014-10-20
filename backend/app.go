package main

import (
    "net/http"
    
    "github.com/gorilla/mux"
    "github.com/op/go-logging"
    
    "./handlers"
)

func main() {
    messageFormat := "[%{level:.4s}] %{message}"
    logging.SetFormatter(logging.MustStringFormatter(messageFormat))
    logger := logging.MustGetLogger("sudoku resolver")
    logger.Info("Application started")
    
    r := mux.NewRouter()
    
    r.HandleFunc("/", handlers.NewSudokuHandler)
    
    http.Handle("/", r)
    http.ListenAndServe(":8080", nil)
}