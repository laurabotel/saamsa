package main.java.saamsa.java;

import org.apache.kafka.common.utils.Utils;
import org.apache.kafka.streams.processor.StreamPartitioner;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

public class partitioner implements StreamPartitioner {
    private final ConcurrentMap<String, AtomicInteger> topicCounterMap = new ConcurrentHashMap<>();
    private int nextValue(String topic) {
        AtomicInteger counter = topicCounterMap.computeIfAbsent(topic, k -> {
            return new AtomicInteger(0);
        });
        return counter.getAndIncrement();
    }
    @Override
    public Integer partition(String topic, Object key, Object value, int numPartitions) {
        return Utils.toPositive(nextValue(topic)) % numPartitions;
    }
  }
