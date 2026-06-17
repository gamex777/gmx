import os

# The exact dependency order required for the engine to boot
files = [
    "includes/TypedArrayShim.js",
    "core/CPU/ARM.js", "core/CPU/THUMB.js", "core/CPU/CPSR.js",
    "core/cartridge/SaveDeterminer.js", "core/cartridge/SRAM.js", "core/cartridge/EEPROM.js", "core/cartridge/FLASH.js", "core/cartridge/GPIO.js",
    "core/graphics/Renderer.js", "core/graphics/RendererProxy.js", "core/graphics/RendererShim.js", "core/graphics/AffineBG.js",
    "core/graphics/BGTEXT.js", "core/graphics/BG2FrameBuffer.js", "core/graphics/BGMatrix.js", "core/graphics/ColorEffects.js",
    "core/graphics/Compositor.js", "core/graphics/Mosaic.js", "core/graphics/OBJ.js", "core/graphics/OBJWindow.js",
    "core/graphics/Window.js", "core/graphics/Worker.js",
    "core/memory/DMA0.js", "core/memory/DMA1.js", "core/memory/DMA2.js", "core/memory/DMA3.js",
    "core/sound/Channel1.js", "core/sound/Channel2.js", "core/sound/Channel3.js", "core/sound/Channel4.js", "core/sound/FIFO.js",
    "core/Cartridge.js", "core/CPU.js", "core/DMA.js", "core/Graphics.js", "core/IRQ.js", "core/JoyPad.js",
    "core/Memory.js", "core/RunLoop.js", "core/Saves.js", "core/Serial.js", "core/Sound.js", "core/Timer.js",
    "core/Wait.js", "core/Worker.js", "core/Emulator.js"
]

with open("IodineGBACore_Compiled.js", "w", encoding="utf-8") as outfile:
    for fname in files:
        if os.path.exists(fname):
            with open(fname, "r", encoding="utf-8") as infile:
                outfile.write(f"\n/* ========= {fname} ========= */\n")
                outfile.write(infile.read())
                outfile.write("\n")
        else:
            print(f"FILE MISSING: {fname}")

print("Success! IodineGBACore_Compiled.js has been generated.")
