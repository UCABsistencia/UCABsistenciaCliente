"use strict";
exports.ENABLE_PROFILING = false;
function time() {
    if (!exports.ENABLE_PROFILING) {
        return;
    }
    if (global.android) {
        return java.lang.System.nanoTime() / 1000000; // 1 ms = 1000000 ns
    }
    else {
        return CACurrentMediaTime() * 1000;
    }
}
exports.time = time;
var timers = new Map();
function start(name) {
    if (!exports.ENABLE_PROFILING) {
        return;
    }
    var info;
    if (timers.has(name)) {
        info = timers.get(name);
        if (info.currentStart != 0) {
            console.log("WARNING: Timer already started: " + name);
        }
        info.currentStart = time();
    }
    else {
        info = {
            totalTime: 0,
            count: 0,
            currentStart: time()
        };
        timers.set(name, info);
    }
}
exports.start = start;
function pause(name) {
    if (!exports.ENABLE_PROFILING) {
        return;
    }
    var info = pauseInternal(name);
    if (info) {
        console.log("---- [" + name + "] PAUSE last: " + info.lastTime + " total: " + info.totalTime + " count: " + info.count);
    }
}
exports.pause = pause;
function stop(name) {
    if (!exports.ENABLE_PROFILING) {
        return;
    }
    var info = pauseInternal(name);
    if (info) {
        console.log("---- [" + name + "] STOP total: " + info.totalTime + " count:" + info.count);
        timers.delete(name);
    }
}
exports.stop = stop;
function pauseInternal(name) {
    var info = timers.get(name);
    if (!info) {
        console.log("WARNING: No timer started: " + name);
        return null;
    }
    info.lastTime = Math.round(time() - info.currentStart);
    info.totalTime += info.lastTime;
    info.count++;
    info.currentStart = 0;
    return info;
}
function startCPUProfile(name) {
    if (!exports.ENABLE_PROFILING) {
        return;
    }
    if (global.android) {
        __startCPUProfiler(name);
    }
}
exports.startCPUProfile = startCPUProfile;
function stopCPUProfile(name) {
    if (!exports.ENABLE_PROFILING) {
        return;
    }
    if (global.android) {
        __stopCPUProfiler(name);
    }
}
exports.stopCPUProfile = stopCPUProfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLVyxRQUFBLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUVwQztJQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsb0JBQW9CO0lBQ3RFLENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0FBQ0wsQ0FBQztBQVhELG9CQVdDO0FBU0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7QUFDMUMsZUFBc0IsSUFBWTtJQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBSSxJQUFlLENBQUM7SUFDcEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQW1DLElBQU0sQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJ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