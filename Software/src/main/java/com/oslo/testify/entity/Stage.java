package com.oslo.testify.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stages")
public class Stage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "iteration_id")
  private Iteration iteration;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "number", nullable = false)
  private Integer number;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @ManyToOne
  @JoinColumn(name = "type_id")
  private Type type;

  @ManyToOne
  @JoinColumn(name = "subtype_id")
  private SubType subType;

  @ManyToOne
  @JoinColumn(name = "tester_id")
  private User tester;

  @Enumerated(EnumType.STRING)
  @Column(name = "priority")
  private Priority priority;

  @Column(name = "date_required")
  private LocalDate dateRequired;

  @Column(name = "tested_from")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
  private LocalDateTime testedFrom;

  @Column(name = "tested_to")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
  private LocalDateTime testedTo;

  @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference(value = "stage-checkList")
  private List<CheckList> checkLists = new ArrayList<>();

  @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference(value = "stage-steps")
  private List<Step> steps = new ArrayList<>();

  @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference(value = "stage-documents")
  private List<Document> documents = new ArrayList<>();

  @Column(name = "expected_result")
  private String expectedResult;

  @Column(name = "got_result")
  private String gotResult;

  @Column(name = "estimated_time")
  private Integer estimatedTime;

  @Column(name = "comment")
  private String comment;

  @Enumerated(EnumType.STRING)
  @Column( name = "status")
  private StageStatus status;

  @ManyToOne
  @JoinColumn(name = "previous_stage_id")
  @JsonBackReference(value = "previous-stage-reference")
  private Stage previousStage;

  @OneToMany(mappedBy = "previousStage")
  @JsonManagedReference(value = "previous-stage-reference")  // Gestionar la relación para el Stage copiado
  private List<Stage> nextStages = new ArrayList<>();

  public Stage() {
  }

  public Stage(Long id, Iteration iteration, String name, Integer number, Category category,
               Type type, SubType subType, User tester, Priority priority, LocalDate dateRequired,
               LocalDateTime testedFrom, LocalDateTime testedTo, List<CheckList> checkLists,
               List<Step> steps, String expectedResult, String gotResult, Integer estimatedTime,
               String comment, List<Document> documents) {
    this.id = id;
    this.iteration = iteration;
    this.name = name;
    this.number = number;
    this.category = category;
    this.type = type;
    this.subType = subType;
    this.tester = tester;
    this.priority = priority;
    this.dateRequired = dateRequired;
    this.testedFrom = testedFrom;
    this.testedTo = testedTo;
    this.checkLists = checkLists;
    this.documents = documents;
    this.steps = steps;
    this.expectedResult = expectedResult;
    this.gotResult = gotResult;
    this.estimatedTime = estimatedTime;
    this.comment = comment;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Iteration getIteration() {
    return iteration;
  }

  public void setIteration(Iteration iteration) {
    this.iteration = iteration;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Priority getPriority() {
    return priority;
  }

  public void setPriority(Priority priority) {
    this.priority = priority;
  }

  public LocalDate getDateRequired() {
    return dateRequired;
  }

  public void setDateRequired(LocalDate dateRequired) {
    this.dateRequired = dateRequired;
  }

  public LocalDateTime getTestedFrom() {
    return testedFrom;
  }

  public void setTestedFrom(LocalDateTime testedFrom) {
    this.testedFrom = testedFrom;
  }

  public LocalDateTime getTestedTo() {
    return testedTo;
  }

  public void setTestedTo(LocalDateTime testedTo) {
    this.testedTo = testedTo;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public User getTester() {
    return tester;
  }

  public void setTester(User tester) {
    this.tester = tester;
  }

  public List<Step> getSteps() {
    return steps;
  }

  public void setSteps(List<Step> steps) {
    this.steps = steps;
  }

  public List<CheckList> getCheckLists() {
    return checkLists;
  }

  public void setCheckLists(List<CheckList> checkLists) {
    this.checkLists = checkLists;
  }

  public List<Document> getDocuments() {
    return documents;
  }

  public void setDocuments(List<Document> documents) {
    this.documents = documents;
  }

  public Integer getNumber() {
    return number;
  }

  public void setNumber(Integer number) {
    this.number = number;
  }

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public Type getType() {
    return type;
  }

  public void setType(Type type) {
    this.type = type;
  }

  public SubType getSubType() {
    return subType;
  }

  public void setSubType(SubType subType) {
    this.subType = subType;
  }

  public String getExpectedResult() {
    return expectedResult;
  }

  public void setExpectedResult(String expectedResult) {
    this.expectedResult = expectedResult;
  }

  public String getGotResult() {
    return gotResult;
  }

  public void setGotResult(String gotResult) {
    this.gotResult = gotResult;
  }

  public Integer getEstimatedTime() {
    return estimatedTime;
  }

  public void setEstimatedTime(Integer estimatedTime) {
    this.estimatedTime = estimatedTime;
  }

  public StageStatus getStatus() {
    return status;
  }

  public void setStatus(StageStatus status) {
    this.status = status;
  }

  public Stage getPreviousStage() {
    return previousStage;
  }

  public void setPreviousStage(Stage previousStage) {
    this.previousStage = previousStage;
  }

  public List<Stage> getNextStages() {
    return nextStages;
  }

  public void setNextStages(List<Stage> nextStages) {
    this.nextStages = nextStages;
  }

  @Override
  public String toString() {
    return "Stage{" +
      "id=" + id +
      ", iteration=" + iteration +
      ", name='" + name + '\'' +
      ", number=" + number +
      ", category=" + category +
      ", type=" + type +
      ", subType=" + subType +
      ", tester=" + tester +
      ", priority=" + priority +
      ", dateRequired=" + dateRequired +
      ", testedFrom=" + testedFrom +
      ", testedTo=" + testedTo +
      //", checkLists=" + checkLists +
      //", steps=" + steps +
      ", expectedResult='" + expectedResult + '\'' +
      ", gotResult='" + gotResult + '\'' +
      ", estimatedTime=" + estimatedTime +
      ", comment='" + comment + '\'' +
      ", status=" + status +
      ", previousStage=" + previousStage +
      ", nextStages=" + nextStages +
      '}';
  }
}
