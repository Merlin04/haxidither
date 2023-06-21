// simple class to hold multiple ranges of numbers efficiently, add ranges, and check if a number is in any of the contained ranges

type Range = [number, number]; // range inclusive on both ends

export class Ranges {
    ranges: Range[] = []; // list of ranges, sorted by start
    
    addRange([start, end]: Range) {
        if(start >= end) {
            throw new Error("start must be less than end");
        }

        if(this.ranges.length === 0) {
            this.ranges.push([start, end]);
            return;
        }

        // insert range at correct place
        let i = 0;
        while(i < this.ranges.length && this.ranges[i][0] < start) {
            i++;
        }
        this.ranges.splice(i, 0, [start, end]);

        this.mergeRanges();
    }

    mergeRanges() {
        let i = 1;
        while(i < this.ranges.length) {
            if(this.ranges[i - 1][1] >= this.ranges[i][0]) {
                // merge ranges
                this.ranges[i - 1][1] = Math.max(this.ranges[i - 1][1], this.ranges[i][1]);
                this.ranges.splice(i, 1);
            } else {
                i++;
            }
        }
    }
}