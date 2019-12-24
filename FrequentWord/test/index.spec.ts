import {  runText, runTextFile } from "../src/index"
import PATH from 'path'
const assert = require( 'assert' )

describe( "Test", () => {
  // it( "runText, use js memory", () => {
  //   runText( 
  //     `After the first fortnight or three weeks of her absence, health, good humour, and cheerfulness began to reappear at Longbourn. Everything wore a happier aspect. The families who had been in town for the winter came back again, and summer finery and summer engagements arose. Mrs. Bennet was restored to her usual querulous serenity; and, by the middle of June, Kitty was so much recovered as to be able to enter Meryton without tears; an event of such happy promise as to make Elizabeth hope that by the following Christmas she might be so tolerably reasonable as not to mention an officer above once a day, unless, by some cruel and malicious arrangement at the War Office, another regiment should be quartered in Meryton. The time fixed for the beginning of their northern tour was now fastbefore her uncle and aunt’s arrival. But they did pass away, and Mr. and Mrs. Gardiner, with their four children, did at length appear at Longbourn. The children, two girls of six and eight years old, and two younger boys, were to be left under the particular care of their cousin Jane, who was the general favourite, and whose steady sense and sweetness of temper exactly adapted her for attending to them in every way—teaching them, playing with them, and loving them. The Gardiners stayed only one night at Longbourn, and set off the next morning with Elizabeth in pursuit of novelty and amusement. One enjoyment was certain—that of suitableness of companions; a suitableness which comprehended health and temper to bear inconveniences—cheerfulness to enhance every pleasure—and affection`, 
  //     { useJSMemory: true }
  //     )
  // } )
  // it( "runText, use file memory", () => {
  //   runText( 
    // `After the first fortnight or three weeks of her absence, health, good humour, and cheerfulness began to reappear at Longbourn. Everything wore a happier aspect. The families who had been in town for the winter came back again, and summer finery and summer engagements arose. Mrs. Bennet was restored to her usual querulous serenity; and, by the middle of June, Kitty was so much recovered as to be able to enter Meryton without tears; an event of such happy promise as to make Elizabeth hope that by the following Christmas she might be so tolerably reasonable as not to mention an officer above once a day, unless, by some cruel and malicious arrangement at the War Office, another regiment should be quartered in Meryton. The time fixed for the beginning of their northern tour was now fastbefore her uncle and aunt’s arrival. But they did pass away, and Mr. and Mrs. Gardiner, with their four children, did at length appear at Longbourn. The children, two girls of six and eight years old, and two younger boys, were to be left under the particular care of their cousin Jane, who was the general favourite, and whose steady sense and sweetness of temper exactly adapted her for attending to them in every way—teaching them, playing with them, and loving them. The Gardiners stayed only one night at Longbourn, and set off the next morning with Elizabeth in pursuit of novelty and amusement. One enjoyment was certain—that of suitableness of companions; a suitableness which comprehended health and temper to bear inconveniences—cheerfulness to enhance every pleasure—and affection`,
    // { useJSMemory: false }
    // )
  // } )
  it ( "run text file", ( done ) => {
    runTextFile( PATH.resolve( __dirname, '../.book/test1.txt' ), {
      useJSMemory: true
    }, done )
  } ) 
} )