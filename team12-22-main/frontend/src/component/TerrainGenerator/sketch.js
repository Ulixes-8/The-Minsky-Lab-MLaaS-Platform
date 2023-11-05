import React from "react";
import "./style.css";
//import p5 from "./p5.min.js";
import p5 from "p5";
export default function sketch(p5) { 
var terrain = [];
            var scl= 55;
            var w = 2000;
            var h = 2000;
            var flying=0;
            var cols=w/scl;
            var rows=h/scl;
            p5.setup = function() {
                const canvas = p5.createCanvas(p5.windowWidth,600, p5.WEBGL);
                canvas.parent('terrain-container');
                //canvas.position(0,1250);
                //canvas.style('z-index','-100');
                //canvas.elt.style.position = "fixed"

                p5.angleMode(p5.DEGREES);

                
            }
            p5.draw = function() {

                flying=flying-0.06;
                var yoff = flying;
                for(var y=0;y<rows;y++){
                    var xoff=0;
                    terrain.push([]);
                    for(var x=0;x<cols;x++){
                        terrain[y][x]=(p5.noise(xoff,yoff,0)-0.5)*100;
                        xoff=xoff+0.2;
                    }
                    yoff=yoff+0.2
                }


                p5.background('black');
                p5.noFill();
                p5.rotateX(70);
                p5.rotateZ(85);
                p5.translate(-h/2, -w/2);
                //p5.camera(20); // sets camera position to (200, 0, 600) and looks at the origin


                for(var y =0; y<rows-1; y++){
                    p5.beginShape(p5.TRIANGLE_STRIP);
                    for(var x=0; x<cols; x++){
                        var toColor = p5.color(76, 230, 196); // Bright Turquoise
                        var fromColor = p5.color(182, 109, 255); //

                        // Calculate the amount for the gradient (between 0 and 1)
                        var amt = p5.map(terrain[x][y], -50, 50, 0, 1);
                        
                        // Use lerpColor to get the color based on the amount
                        var strokeColor = p5.lerpColor(fromColor, toColor, amt);
                        
                        // Set the stroke color
                        p5.stroke(strokeColor);

           
                        p5.vertex(x*scl, y*scl,terrain[x][y]);
                        p5.vertex(x*scl, (y+1)*scl,terrain[x][y+1]);
                    
                    }
                    p5.endShape();
                }

            }}
        