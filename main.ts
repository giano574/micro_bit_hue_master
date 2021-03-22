input.onButtonPressed(Button.A, function () {
    change_target(-10)
})
function change_target (value: number) {
    target_light = Math.min(255, Math.max(0, target_light + value))
    show_target()
}
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
})
input.onButtonPressed(Button.B, function () {
    change_target(10)
})
function show_target () {
    led.plotBarGraph(
    target_light,
    255
    )
}
let target_light = 0
radio.setGroup(1)
let id = "m"
target_light = Math.round(255 / 2)
show_target()
basic.forever(function () {
    if (Math.abs(input.lightLevel() - target_light) > 0) {
        serial.writeLine("" + id + "," + input.lightLevel() + "," + target_light)
        basic.pause(10000)
    }
})
