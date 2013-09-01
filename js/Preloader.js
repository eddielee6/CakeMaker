function preloadResources() {

    //Main screen
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("blindMode", "img/BlindMode.jpg"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("guidedMode", "img/GuidedMode.jpg"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("logo", "img/logo.png"));

    //General
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("down-arrow", "img/arrow.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("zoom-in", "img/zoom-in.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("zoom-out", "img/zoom-out.png"));

    //Kitchen
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("kitchenWall", "img/wall-landscape.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("worksurface", "img/worksurface.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("worksurface-edge", "img/worksurface-edge.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("shelf", "img/shelf.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("blackboard", "img/blackboard.png"));

    //Cupboard doors
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("door-left-closed", "img/door-left-closed.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("door-left-open", "img/door-left-open.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("door-right-closed", "img/door-right-closed.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("door-right-open", "img/door-right-open.png"));

    //Fridge
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("fridge-door-open", "img/fridge-door-open.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("fridge-door-closed", "img/fridge-door-closed.png"));

    //Drawers
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("blank-drawer", "img/blank-drawer.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("drawer-closed", "img/drawer-closed.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("drawer-open", "img/drawer-open.png"));

    //Oven
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-base", "img/Oven/base.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-door-closed", "img/Oven/DoorClosed.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-door-open", "img/Oven/DoorOpen.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-inner-off", "img/Oven/InnerOvenOff.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-inner-on", "img/Oven/InnerOvenOn.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-knob-0", "img/Oven/knob-0.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-knob-90", "img/Oven/knob-90.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-knob-180", "img/Oven/knob-180.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-knob-270", "img/Oven/knob-270.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-light-off", "img/Oven/LightOff.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("oven-light-on", "img/Oven/LightOn.png"));

    //Sink
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("sink-empty", "img/sink-empty.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("sink-full", "img/sink-full.png"));

    //Hob
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-base", "img/Hob/base.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-bottom-left-off", "img/Hob/bottom-left-off.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-bottom-left-on", "img/Hob/bottom-left-on.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-bottom-right-off", "img/Hob/bottom-right-off.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-bottom-right-on", "img/Hob/bottom-right-on.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-top-left-off", "img/Hob/top-left-off.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-top-left-on", "img/Hob/top-left-on.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-top-right-off", "img/Hob/top-right-off.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-top-right-on", "img/Hob/top-right-on.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-power-off", "img/Hob/power-off.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("hob-power-on", "img/Hob/power-on.png"));

    //Objects
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("butter", "img/Objects/butter.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("chocolate", "img/Objects/chocolate.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("coffee-jar", "img/Objects/coffee-jar.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("self-raising-flour", "img/Objects/self-raising-flour.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("plain-flour", "img/Objects/plain-flour.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("bicarbonate-of-soda", "img/Objects/bicarbonate-of-soda.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("muscovado-sugar", "img/Objects/muscovado-sugar.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("caster-sugar", "img/Objects/caster-sugar.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("cocoa", "img/Objects/cocoa.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("egg-box", "img/Objects/egg-box.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("buttermilk", "img/Objects/ButterMilk.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("whisk", "img/Objects/whisk.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-whole", "img/Objects/scales/whole.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-nobowl-weight", "img/Objects/scales/hasWeight.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-nobowl-empty", "img/Objects/scales/scales.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-bowl-butter", "img/Objects/scales/bowl-butter.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-bowl-caster", "img/Objects/scales/bowl-caster.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-bowl-choc", "img/Objects/scales/bowl-choc.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-bowl-cocoa", "img/Objects/scales/bowl-cocoa.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-bowl-flour", "img/Objects/scales/bowl-flour.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("scales-bowl-mus", "img/Objects/scales/bowl-mus.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("cloth", "img/Objects/cloth.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("wooden-spoon", "img/Objects/wooden-spoon.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("cake-tin-normal", "img/Objects/cake-tin/normal.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("cake-tin-butter", "img/Objects/cake-tin/withbutter.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("cake-tin-mix", "img/Objects/cake-tin/withMix.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("cake-tin-cake", "img/Objects/cake-tin/withCake.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("cake", "img/Objects/cake.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("jug-normal", "img/Objects/jug/normal.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("jug-water", "img/Objects/jug/withwater.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("jug-coffee", "img/Objects/jug/withcoffee.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("knife-normal", "img/Objects/knife/normal.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("knife-butter", "img/Objects/knife/withbutter.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("saucepan-normal", "img/Objects/saucepan/normal.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("saucepan-choc", "img/Objects/saucepan/withchoc.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("saucepan-choc-butter", "img/Objects/saucepan/withchocandbutter.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("saucepan-choc-butter-coffee", "img/Objects/saucepan/withchocbutterandcoffee.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("saucepan-melted-mix", "img/Objects/saucepan/withmeltedmix.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("tablespoon-normal", "img/Objects/tablespoon/normal.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("tablespoon-coffee", "img/Objects/tablespoon/withcoffee.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("tablespoon-milk", "img/Objects/tablespoon/withmilk.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("tablespoon-bicarb", "img/Objects/tablespoon/withBicarb.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("egg", "img/Objects/egg.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("smashed-egg", "img/Objects/smashed-egg.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-bowl-normal", "img/Objects/small-bowl/normal.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-1-egg", "img/Objects/small-bowl/withOneEgg.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-2-egg", "img/Objects/small-bowl/withTwoEggs.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-3-egg", "img/Objects/small-bowl/withThreeEggs.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-three-eggs-buttermilk-1", "img/Objects/small-bowl/withThreeEggsAndButtermilk1.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-three-eggs-buttermilk-2", "img/Objects/small-bowl/withThreeEggsAndButtermilk2.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-three-eggs-buttermilk-3", "img/Objects/small-bowl/withThreeEggsAndButtermilk3.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("small-eggmix-beat", "img/Objects/small-bowl/beatup-mix.png"));

    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-normal", "img/Objects/big-bowl/normal.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-flour-1", "img/Objects/big-bowl/flour1.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-flour-2", "img/Objects/big-bowl/flour2.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-bicarb", "img/Objects/big-bowl/bicarb.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-mus", "img/Objects/big-bowl/mus.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-caster", "img/Objects/big-bowl/caster.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-cocoa", "img/Objects/big-bowl/cocoa.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-mixed", "img/Objects/big-bowl/mixed.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-mixed-egg", "img/Objects/big-bowl/mixed-withEgg.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-mixed-choc", "img/Objects/big-bowl/mixed-withEggAndChoc.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-mixed-full", "img/Objects/big-bowl/fullMixed.png"));
    resourceManager.preLoadedGraphics.push(new PreloadedGraphic("big-bowl-dirty", "img/Objects/big-bowl/dirty.png"));


    //Audio
    resourceManager.preLoadedSounds.push(new PreloadedAudio("closeDrawer", "close-drawer"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("openDrawer", "open-drawer"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("openCloseDoor", "door-open"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("eggBeat", "egg-beat"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("eggSplat", "egg-splat"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("emptySink", "empty-sink"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("fillSink", "sink-fill"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("hitMetal", "hit-metal"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("washingUp", "washing-up"));
    resourceManager.preLoadedSounds.push(new PreloadedAudio("mixBowl", "mix-bowl"));

    
    resourceManager.loader.addCompletionListener(preloadingComplete);
    resourceManager.loader.addProgressListener(preloadingProgressChanged)
    resourceManager.loadGraphics();
    resourceManager.loadSounds();
    resourceManager.loader.start(); 
}