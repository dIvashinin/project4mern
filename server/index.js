import express from "express";
// older notation
// const express = require("express");

const app=express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server running in port:", port);
});