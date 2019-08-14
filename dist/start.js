"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// todo: use dotconfig and process env variables
app_1.default.listen(8080, () => {
    console.log('Server running at port 8080');
});
//# sourceMappingURL=start.js.map