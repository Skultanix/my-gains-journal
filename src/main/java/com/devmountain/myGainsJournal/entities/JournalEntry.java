package com.devmountain.myGainsJournal.entities;

import com.devmountain.myGainsJournal.dtos.JournalEntryDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Entries")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JournalEntry {

    @ManyToOne
    @JsonBackReference
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String exerciseType;

    @Column(columnDefinition = "text")
    private String exerciseName;

    @Column
    private int weight;

    @Column
    private int setCount;

    @Column
    private int setOne;

    @Column
    private int setTwo;

    @Column
    private int setThree;

    @Column
    private int setFour;

    @Column
    private int setFive;

    @Column
    private float distance;

    @Column
    private float time;

    public JournalEntry(JournalEntryDto journalEntryDto) {
        if (journalEntryDto.getExerciseType() != null) {
            this.exerciseType = journalEntryDto.getExerciseType();
        }
        if (journalEntryDto.getExerciseName() != null) {
            this.exerciseName = journalEntryDto.getExerciseName();
        }
        this.weight = journalEntryDto.getWeight();
        this.setCount = journalEntryDto.getSetCount();
        this.setOne = journalEntryDto.getSetOne();
        this.setTwo = journalEntryDto.getSetTwo();
        this.setThree = journalEntryDto.getSetThree();
        this.setFour = journalEntryDto.getSetFour();
        this.setFive = journalEntryDto.getSetFive();
        this.distance = journalEntryDto.getDistance();
        this.time = journalEntryDto.getTime();
    }
}
