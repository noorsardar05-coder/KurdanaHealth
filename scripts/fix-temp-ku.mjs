import { readFileSync, writeFileSync } from "fs";

const path = "c:/Users/pc/Desktop/kurdanahealthh/src/features/first-time-mothers/data/babyCare.js";
let s = readFileSync(path, "utf8");
s = s.replace(/گەرmkirdn/g, "گەرمبوون");
writeFileSync(path, s);
console.log("fixed", s.includes("گەرmkirdn") ? "FAIL" : "OK");
