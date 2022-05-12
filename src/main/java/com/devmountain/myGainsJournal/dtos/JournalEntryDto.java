package com.devmountain.myGainsJournal.dtos;

import com.devmountain.myGainsJournal.entities.JournalEntry;
import com.devmountain.myGainsJournal.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JournalEntryDto implements Serializable {
    private UserDto userDto;
    private Long id;
    private String exerciseType;
    private String exerciseName;
    private int weight;
    private int setCount;
    private int setOne;
    private int setTwo;
    private int setThree;
    private int setFour;
    private int setFive;
    private float distance;
    private float time;

    public JournalEntryDto(JournalEntry journalEntry) {
        if (journalEntry.getId() != null) {
            this.id = journalEntry.getId();
        }
        if (journalEntry.getExerciseType() != null) {
            this.exerciseType = journalEntry.getExerciseType();
        }
        if (journalEntry.getExerciseName() != null) {
            this.exerciseName = journalEntry.getExerciseName();
        }
        this.weight = journalEntry.getWeight();
        this.setCount = journalEntry.getSetCount();
        this.setOne = journalEntry.getSetOne();
        this.setTwo = journalEntry.getSetTwo();
        this.setThree = journalEntry.getSetThree();
        this.setFour = journalEntry.getSetFour();
        this.setFive = journalEntry.getSetFive();
        this.distance = journalEntry.getDistance();
        this.time = journalEntry.getTime();
    }
}
